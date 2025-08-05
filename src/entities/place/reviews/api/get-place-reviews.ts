import { customAxios } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'
import { PLACE_REVIEW_URL } from './endpoint'
import { PLACE_REVIEW_QUERY_KEY } from './queryKey'
import { PlaceReviewDetailType } from '../model'

export const getPlaceReviews = async (
  id: string
): Promise<PlaceReviewDetailType[]> => {
  try {
    const response = await customAxios.get(PLACE_REVIEW_URL.reviewsByPlace(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetPlaceReviews = (place_id: string) => {
  return useQuery({
    queryKey: PLACE_REVIEW_QUERY_KEY.reviews(place_id),
    queryFn: () => getPlaceReviews(place_id),
  })
}
