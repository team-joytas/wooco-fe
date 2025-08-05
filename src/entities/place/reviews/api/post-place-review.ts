import { customAxios } from '@/src/shared/api'
import { ReviewPayloadType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLACE_REVIEW_URL } from './endpoint'
import { PLACE_REVIEW_QUERY_KEY } from './queryKey'

export const postPlaceReview = async (
  placeId: string,
  reviewPayload: ReviewPayloadType
) => {
  try {
    const response = await customAxios.post(
      PLACE_REVIEW_URL.reviewsByPlace(placeId),
      reviewPayload
    )
    return response.data
  } catch (error) {
    console.error('Failed to submit review', error)
    throw error
  }
}

export const usePostPlaceReview = (place_id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewPayloadType) => postPlaceReview(place_id, data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: PLACE_REVIEW_QUERY_KEY.reviews(place_id),
      })
      queryClient.refetchQueries({
        queryKey: PLACE_REVIEW_QUERY_KEY.detail(place_id),
      })
    },
  })
}
