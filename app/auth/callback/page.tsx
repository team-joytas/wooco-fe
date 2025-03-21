'use client'

import { useEffect, useRef, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { postSocialLogin } from '@/src/entities/login/api'
import { getMyProfile } from '@/src/entities/user/api'
import useUserStore from '@/src/shared/store/userStore'

/**
 * 로그인 완료 후 어디로 이동시킬지 핸들링합니다.
 *
 * NEXT-AUTH 에서 제공하는 `session`을 사용하지 않아 `access_token`과 사용자 정보를 zustand를 통해 저장 후 session을 제거합니다. @see handleLogin()
 *
 * @todo 로직들은 view 디렉토리로 옮기기
 * @todo 페이지 전역적으로 로그인 실패에 대한 토스트 메시지 표기가 필요합니다. 에러메시지는 `{NEXT_URL}?error={ERRER_TYPE}`으로 표기됩니다.
 * @todo 로그인 진행중에 대한 UI적 표기가 필요합니다. ex) suspense
 * @author JiHongKim98
 */
function LoginCallbackHandler() {
  const router = useRouter()
  const { status, data: session } = useSession()
  const hasHandled = useRef(false)

  useEffect(() => {
    if (status === 'loading' || hasHandled.current) return
    hasHandled.current = true

    const handleLogin = async () => {
      try {
        if (session?.idToken && session?.provider) {
          const { access_token: accessToken } = await postSocialLogin(
            session.idToken,
            session.provider
          )
          localStorage.setItem('accessToken', accessToken)

          const user = await getMyProfile()
          useUserStore.getState().setUser(user)

          if (user.on_boarding) {
            router.replace('/onboard')
            return
          }
        }
      } catch (error) {
        console.error(error)
      }

      await signOut({ redirect: false }) // 백엔드와 통신 후 바로 세션을 삭제합니다.

      router.replace('/')
    }

    handleLogin()
  }, [status, session])

  return null
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCallbackHandler />
    </Suspense>
  )
}
