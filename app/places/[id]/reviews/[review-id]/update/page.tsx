import { ReviewFormLayout } from '@/src/widgets'

export default function Page({
  params,
}: {
  params: { id: string; 'review-id': string }
}) {
  const reviewId = params['review-id']
  return <ReviewFormLayout placeId={params.id} reviewId={reviewId} />
}
