export const getPlaceSearchResult = async (region: string, value: string) => {
  const result = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${region} ${value}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  )
  const data = await result.json()
  return data
}
