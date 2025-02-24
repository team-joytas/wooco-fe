'use client'
import ReviewFormLayout from '@/src/widgets/review-form-layout'

interface UpdateReviewProps {
  placeId: string,
  reviewId: string
}

export default function UpdateReview({ placeId, reviewId }: UpdateReviewProps) {
  return <ReviewFormLayout placeId={placeId} reviewId={reviewId} />
}
