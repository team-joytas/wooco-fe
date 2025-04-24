import { customAxios } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'
import { PlaceReviewDetailType } from '../model'

export const getPlaceReviews = async (
  id: string
): Promise<PlaceReviewDetailType[]> => {
  try {
    const response = await customAxios.get(PLACE_URL.reviewsByPlace(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetPlaceReviews = (id: string) => {
  return useQuery({
    queryKey: PLACE_QUERY_KEY.reviews(id),
    queryFn: () => getPlaceReviews(id),
    gcTime: 0,
  })
}
