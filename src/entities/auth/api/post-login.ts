import useUserStore from '@/src/shared/store/userStore'
import { publicAxios, customAxios } from '@/src/shared/api'

export const postLogin = async (
  code: string | null,
  state: string | null,
  provider: string | null
): Promise<{ success: boolean; onBoarding?: boolean; userId?: string }> => {
  try {
    if (!code || !state || !provider) return { success: false }
    const url = `/oauth2/${provider}/login?code=${code}&state=${state}`
    const response = await publicAxios.get(url)
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
