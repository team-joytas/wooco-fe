import 'next-auth'
import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    // user: User & DefaultSession['User']
    // expires: string
    idToken?: string
    provider?: string
    // accessToken?: string
    // accessTokenExpires?: number
    // refreshToken?: string
    // refreshTokenExpires?: number
    // error?: 'RefreshAccessTokenError'
  }

  //   interface User {
  //     id?: string
  //     name?: string
  //     profileUrl?: string
  //   }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // id: string
    // name: string
    // accessToken?: string
    // accessTokenExpires?: number
    // refreshToken?: string
    // refreshTokenExpires?: number
    // exp: number
    // error?: 'RefreshAccessTokenError'
    idToken?: string
    provider?: string
  }
}
