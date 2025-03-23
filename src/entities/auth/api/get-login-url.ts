import { publicAxios } from '@/src/shared/api'

export const getLoginUrl = async (): Promise<string> => {
  const url = `/auth/kakao/social-login/url`
  const response = await publicAxios.get(url)
  return response.data.results.url
}
