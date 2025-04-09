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
export const useDeletePlaceReview = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePlaceReview(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLACE_QUERY_KEY.reviews(id) })
    },
  })
}
