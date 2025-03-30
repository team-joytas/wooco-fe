export const getLoginUrl = async (): Promise<string> => {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
  return `${SERVER_URL}/api/v1/oauth2/authorization/kakao`
}
