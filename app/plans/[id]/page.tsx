import DetailPlan from '@/src/views/detail-plan'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailPlan planId={params.id} />
}
