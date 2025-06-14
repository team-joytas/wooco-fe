import { customAxios } from '@/src/shared/api'
import { ReviewPayloadType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'

export const postPlaceReview = async (
  placeId: string,
  reviewPayload: ReviewPayloadType
) => {
  try {
    const response = await customAxios.post(
      PLACE_URL.reviewsByPlace(placeId),
      reviewPayload
    )
    return response.data
  } catch (error) {
    console.error('Failed to submit review', error)
    throw error
  }
}

export const usePostPlaceReview = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewPayloadType) => postPlaceReview(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLACE_QUERY_KEY.reviews(id) })
    },
  })
}
