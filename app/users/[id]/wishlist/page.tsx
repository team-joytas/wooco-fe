import { getCourses } from '@/src/entities/course/api'
import ListCourse from '@/src/widgets/list-course'

export default async function Page() {
  const courses = await getCourses()

  return <ListCourse courses={courses} title='관심 목록' />
}
