import { ReviewFormLayout } from '@/src/widgets'

export default function Page({ params }: { params: { id: string } }) {
  return <ReviewFormLayout placeId={params.id} />
}
