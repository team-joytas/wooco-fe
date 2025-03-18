import useUserStore from '@/src/shared/store/userStore'
import { publicAxios, customAxios } from '@/src/shared/axios'

export const getLoginUrl = async (): Promise<string> => {
  const url = `/auth/kakao/social-login/url`
  const response = await publicAxios.get(url)
  return response.data.results.url
}

export const postLogin = async (
  code: string | null
): Promise<{ success: boolean; onBoarding?: boolean; userId?: string }> => {
  try {
    if (!code) return { success: false }
    const url = `/auth/kakao/social-login`
    const body = JSON.stringify({ code })

    const response = await publicAxios.post(url, body)
    const accessToken = response.data.results.access_token

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      const me = await customAxios.get('/users/me')
      const onBoarding = me.data.results.on_boarding

      useUserStore.getState().setUser(me.data.results)
      return { success: true, onBoarding, userId: me.data.results.user_id }
    } else return { success: false }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
