import { getCourse } from '@/src/entities/course/api'
import DetailCourse from '@/src/views/detail-course'

export default async function Page({ params }: { params: { id: number } }) {
  const course = await getCourse(params.id)

  return <DetailCourse courseId={params.id} course={course} />
}
