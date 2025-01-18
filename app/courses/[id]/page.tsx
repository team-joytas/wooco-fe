'use client'

import { getCourse } from '@/src/entities/course/api'
import DetailCourse from '@/src/views/detail-course'
import { getComments } from '@/src/entities/comment/api'
import { useState, useEffect } from 'react'
import type { CourseType } from '@/src/entities/course/type'
import type { CommentType } from '@/src/entities/comment/type'

export default function Page({ params }: { params: { id: number } }) {
  const [course, setCourse] = useState<CourseType | null>(null)
  const [comments, setComments] = useState<CommentType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const course = await getCourse(params.id)
      const comments = await getComments(params.id)
      setCourse(course)
      setComments(comments)
    }
    fetchData()
  }, [params.id])

  return (
    <DetailCourse courseId={params.id} course={course} comments={comments} />
  )
}
