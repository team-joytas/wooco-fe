import { customAxios } from '@/src/shared/axios'
import { useQuery } from '@tanstack/react-query'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'
import { PlaceReviewType } from '../model'

export const getPlaceReviews = async (
  id: string
): Promise<PlaceReviewType[]> => {
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
  })
}
