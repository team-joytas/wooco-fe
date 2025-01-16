import { customAxios } from '@/src/shared/axios'

export const getLoginUrl = async (): Promise<string> => {
  const url = `/auth/kakao/social-login/url`
  const response = await customAxios.get(url)
  return response.data.results.url
}

export const postLogin = async (
  code: string | null
): Promise<{ success: boolean; onBoarding?: boolean; userId?: number }> => {
  try {
    if (!code) return { success: false }
    const url = `/auth/kakao/social-login`
    const body = JSON.stringify({ code })

    const response = await customAxios.post(url, body)
    const accessToken = response.data.results.access_token

    const me = await customAxios.get('/users/me')
    const onBoarding = me.data.results.onboarding

    if (accessToken && me) {
      localStorage.setItem('accessToken', accessToken)
      return { success: true, onBoarding, userId: me.data.results.user_id }
    } else return { success: false }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
