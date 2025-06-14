import { customAxios } from '@/src/shared/api'
import { PLACE_URL } from './endpoint'
import { PlaceReviewType } from '../model'
import { useQuery } from '@tanstack/react-query'

export const getPlaceReview = async (id: string): Promise<PlaceReviewType> => {
  try {
    const response = await customAxios.get(PLACE_URL.reviewDetail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetPlaceReview = (id?: string) => {
  return useQuery({
    enabled: Boolean(id),
    queryKey: ['placeReview', id],
    queryFn: () => getPlaceReview(id!),
  })
}
