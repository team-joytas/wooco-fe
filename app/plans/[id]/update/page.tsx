import { getMockCourse } from '@/src/entities/course/api'
import UpdatePlan from '@/src/views/update-plan'

export default async function Page() {
  const course = await getMockCourse(1)

  return <UpdatePlan data={course} />
}
