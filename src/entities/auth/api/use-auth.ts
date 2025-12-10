import { publicFetch, authFetch } from '@/src/shared/api'
import useUserStore from '@/src/shared/store/userStore'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

// ============================================================================
// Auth Functions
// ============================================================================

/**
 * 카카오 로그인 URL 반환
 */
export const getLoginUrl = (): string => {
  return `${SERVER_URL}/api/v1/oauth2/authorization/kakao`
}

/**
 * OAuth 로그인 처리
 */
export const login = async (
  code: string | null,
  state: string | null,
  provider: string | null
): Promise<{ success: boolean; onBoarding?: boolean; userId?: string }> => {
  try {
    if (!code || !state || !provider) return { success: false }

    const url = `/oauth2/${provider}/login?code=${code}&state=${state}`
    const data = await publicFetch.get<{ access_token: string }>(url)
    const accessToken = data.access_token

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)

      const me = await authFetch.get<{
        on_boarding: boolean
        user_id: string
        name: string
        profile_url: string
        description?: string
      }>('/users/me')

      useUserStore.getState().setUser(me)

      return {
        success: true,
        onBoarding: me.on_boarding,
        userId: me.user_id,
      }
    }

    return { success: false }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

/**
 * 로그아웃
 */
export const logout = () => {
  localStorage.removeItem('accessToken')
  useUserStore.getState().clearUser()
  window.location.href = '/login'
}
