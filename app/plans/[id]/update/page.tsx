'use client'

import { getCourse } from '@/src/entities/course/api'
import UpdatePlan from '@/src/views/update-plan'

export default async function Page() {
  const course = await getCourse(1)

  return <UpdatePlan data={course} />
}
