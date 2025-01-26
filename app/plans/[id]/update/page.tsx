import UpdatePlan from '@/src/views/update-plan'

export default function Page({ params }: { params: { id: string } }) {
  return <UpdatePlan id={params.id} />
}
