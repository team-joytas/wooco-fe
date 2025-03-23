import { customAxios } from '@/src/shared/api'
import { UserPlaceReviewType } from '@/src/entities/place'
import { USER_API } from './endpoint'
import { useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'

export const getMyPlaceReviews = async (
  id: string
): Promise<UserPlaceReviewType[]> => {
  try {
    const response = await customAxios.get(USER_API.placeReviews(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetMyPlaceReviews = (id: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myPlaceReviews,
    queryFn: () => getMyPlaceReviews(id),
  })
}
