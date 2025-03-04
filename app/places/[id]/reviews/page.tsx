import ListPlaceReview from '@/src/views/list-place-review'

export default function Page({ params }: { params: { id: string } }) {
  return <ListPlaceReview placeId={params.id} />
}
