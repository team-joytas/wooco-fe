import { customAxios } from '@/src/shared/axios'
import { ReviewPayloadType } from '@/src/entities/review/type'

export const postReview = async (
  placeId: string,
  reviewData: ReviewPayloadType
) => {
  try {
    const response = await customAxios.post(
      `reviews/places/${placeId}`,
      reviewData
    )
    return response.data.results
  } catch (error) {
    console.error('Failed to submit review', error)
    throw error
  }
}

export const getReview = async (id: string): Promise<ReviewPayloadType> => {
  try {
    const response = await customAxios.get(`reviews/${id}`)
    return response.data.results
  } catch (error) {
    console.error('Failed to fetch review', error)
    throw error
  }
}
