import ReviewFormLayout from '@/src/widgets/review-form-layout'

export default function Page({ params }: { params: { id: string } }) {
  return <ReviewFormLayout placeId={params.id} />
}
