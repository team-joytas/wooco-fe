'use client'

import { useGetCourse } from '@/src/entities/course/query'
import UpdateCourse from '@/src/views/update-course'

export default function Page({ params }: { params: { id: string } }) {
  const { data: course } = useGetCourse(params.id)

  if (!course) return <div>Loading...</div>

  return <UpdateCourse id={params.id} data={course} type='course' />
}
