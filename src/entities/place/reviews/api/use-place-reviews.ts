import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { PLACE_REVIEW_URL } from './endpoint'
import { PLACE_REVIEW_QUERY_KEY } from './queryKey'
import { PLACE_QUERY_KEY } from '@/src/entities/place'
import type {
  PlaceReviewType,
  PlaceReviewDetailType,
  ReviewPayloadType,
} from '../model'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 장소의 리뷰 목록 조회
 */
export const usePlaceReviews = (placeId: string) => {
  return useQuery({
    queryKey: PLACE_REVIEW_QUERY_KEY.reviews(placeId),
    queryFn: () =>
      authFetch.get<PlaceReviewDetailType[]>(
        PLACE_REVIEW_URL.reviewsByPlace(placeId)
      ),
  })
}

/**
 * 리뷰 상세 조회
 */
export const usePlaceReview = (placeId: string, reviewId?: string) => {
  return useQuery({
    queryKey: PLACE_REVIEW_QUERY_KEY.review(placeId, reviewId!),
    queryFn: () =>
      authFetch.get<PlaceReviewType>(PLACE_REVIEW_URL.reviewDetail(reviewId!)),
    enabled: Boolean(reviewId),
  })
}

/**
 * 리뷰 작성
 */
export const useCreatePlaceReview = (placeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewPayloadType) =>
      authFetch.post(PLACE_REVIEW_URL.reviewsByPlace(placeId), data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: PLACE_QUERY_KEY.aggregation(placeId),
      })
    },
  })
}

/**
 * 리뷰 수정
 */
export const useUpdatePlaceReview = (placeId: string, reviewId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewPayloadType) =>
      authFetch.patch(PLACE_REVIEW_URL.reviewDetail(reviewId), data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: PLACE_REVIEW_QUERY_KEY.review(placeId, reviewId),
      })
    },
  })
}

/**
 * 리뷰 삭제
 */
export const useDeletePlaceReview = (placeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId: string) =>
      authFetch.delete(PLACE_REVIEW_URL.reviewDetail(reviewId)),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: PLACE_REVIEW_QUERY_KEY.reviews(placeId),
      })
      queryClient.refetchQueries({
        queryKey: PLACE_REVIEW_QUERY_KEY.detail(placeId),
      })
    },
  })
}
