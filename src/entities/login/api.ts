import { customAxios } from '@/src/shared/axios'

export const getLoginUrl = async (): Promise<string> => {
  const url = `/auth/kakao/social-login/url`
  const response = await customAxios.get(url)
  return response.data.results.url
}

export const postLogin = async (code: string | null): Promise<boolean> => {
  if (!code) return false
  const url = `/auth/kakao/social-login`
  const body = JSON.stringify({ code })

  const response = await customAxios.post(url, body)
  const accessToken = response.data.results.access_token

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    return true
  } else return false
}
