import { customAxios } from '@/src/shared/api'
import { ReviewPayloadType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLACE_QUERY_KEY } from './queryKey'
import { PLACE_URL } from './endpoint'

export const updatePlaceReview = async (
  id: string,
  reviewPayload: ReviewPayloadType
) => {
  try {
    const response = await customAxios.patch(
      PLACE_URL.reviewDetail(id),
      reviewPayload
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdatePlaceReview = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReviewPayloadType) => updatePlaceReview(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLACE_QUERY_KEY.reviews(id) })
    },
  })
}
