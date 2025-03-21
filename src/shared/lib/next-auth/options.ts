import { AuthOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'

/**
 * NEXT-AUTH OAuth2 설정 파일입니다.
 *
 * OAuth OIDC 즉, `ID_TOKEN` 을 발급받아 백엔드로 전송하여 로그인 또는 회원가입을 진행합니다.
 *
 * `useSession()`을 통해 사용자 상태를 관리해야하지만
 * 레거시 사용자 상태 관리 로직이 `zustand`로 전역 상태관리하고 있어서 `zustand`와 통합하기 위해
 * 로그인 성공시 `/auth/callback` 페이지로 이동합니다.
 *
 * @author JiHongKim98
 */
const nextAuthOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_KAKAO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_KAKAO_CLIENT_SECRET as string,
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',
        params: { scope: 'openid' },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      issuer: 'https://kauth.kakao.com',
      jwks_endpoint: 'https://kauth.kakao.com/.well-known/jwks.json',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.idToken = token.idToken
        session.provider = token.provider
      }
      return session
    },
    async redirect() {
      return '/auth/callback'
    },
  },
  pages: {
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: 'sid',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      },
    },
    csrfToken: {
      name: 'csrf',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      },
    },
    callbackUrl: {
      name: 'callback-url',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      },
    },
  },
}

export default nextAuthOptions
