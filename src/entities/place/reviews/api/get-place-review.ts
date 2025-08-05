import { customAxios } from '@/src/shared/api'
import { PLACE_REVIEW_URL } from './endpoint'
import { PlaceReviewType } from '../model'
import { PLACE_REVIEW_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'

export const getPlaceReview = async (id: string): Promise<PlaceReviewType> => {
  try {
    const response = await customAxios.get(PLACE_REVIEW_URL.reviewDetail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetPlaceReview = (place_id: string, review_id?: string) => {
  return useQuery({
    enabled: Boolean(review_id),
    queryKey: PLACE_REVIEW_QUERY_KEY.review(place_id, review_id!),
    queryFn: () => getPlaceReview(review_id!),
  })
}
