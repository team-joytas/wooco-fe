import { publicAxios } from '@/src/shared/axios'

export const postSocialLogin = async (id_token: string, provider: string) => {
  try {
    const url = `/auth/${provider}/social-login`
    const response = await publicAxios.post(url, { id_token })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
