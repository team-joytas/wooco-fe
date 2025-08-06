import { CoursePlanFormLayout } from '@/src/widgets'

export default function Page({ params }: { params: { id: string } }) {
  return <CoursePlanFormLayout type='plan' level='update' id={params.id} />
}
