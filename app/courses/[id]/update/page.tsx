import { CourseFormLayout } from '@/src/widgets'

export default function Page({ params }: { params: { id: string } }) {
  return <CourseFormLayout id={params.id} level='update' />
}
