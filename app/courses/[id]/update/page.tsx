import { CoursePlanFormLayout } from '@/src/widgets'

export default function Page({ params }: { params: { id: string } }) {
  return <CoursePlanFormLayout id={params.id} type='course' level='update' />
}
