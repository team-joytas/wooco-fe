'use client'

import { getCourse } from '@/src/entities/course/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CourseType } from '@/src/entities/course/type'
import UpdateCourse from '@/src/views/update-course'

export default function Page({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<CourseType>()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourse(params.id)
        setCourse(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCourse()
  }, [])

  if (!course) return null

  return <UpdateCourse id={params.id} data={course} type='course' />
}
