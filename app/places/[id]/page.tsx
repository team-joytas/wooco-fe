import DetailPlace from '@/src/views/detail-place'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailPlace id={params.id} />
}
