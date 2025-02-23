import UpdateReview from '@/src/views/update-review'

export default function Page({ params }: { params: { id: string } }) {
  return <UpdateReview placeId={params.id} reviewId={''} />
}
