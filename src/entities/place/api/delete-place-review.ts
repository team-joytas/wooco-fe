import { customAxios } from '@/src/shared/api'
import { PLACE_URL } from './endpoint'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLACE_QUERY_KEY } from './queryKey'

export const deletePlaceReview = async (id: string) => {
  try {
    const response = await customAxios.delete(PLACE_URL.reviewDetail(id))
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useDeletePlaceReview = (place_id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (review_id: string) => deletePlaceReview(review_id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: PLACE_QUERY_KEY.reviews(place_id),
      })
      queryClient.refetchQueries({
        queryKey: PLACE_QUERY_KEY.detail(place_id),
      })
    },
  })
}
