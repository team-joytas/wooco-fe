import UpdateReview from '@/src/views/update-review'

export default function Page({
  params,
}: {
  params: { id: string; 'review-id': string }
}) {
  const reviewId = params['review-id']
  return <UpdateReview placeId={params.id} reviewId={reviewId} />
}
