'use client'

import CardCourse from '@/src/features/course/card-course'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { getCourses } from '@/src/entities/course/api'
import { getUser } from '@/src/entities/user/api'
import { CourseType } from '@/src/entities/course/type'
import { UserProfileType } from '@/src/entities/user/type'
import { useState, useEffect } from 'react'

export default function Page() {
  const [courses, setCourses] = useState<CourseType[]>([])
  const [user, setUser] = useState<UserProfileType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCourses({ sort: 'recent' })
      const user = await getUser('1')
      setCourses(courses)
      setUser(user)
    }
    fetchData()
  }, [])

  const userName = user?.name

  return (
    <div className='w-full pt-[20px] pb-[20px] px-[16px] flex flex-col'>
      <span className='border-b text-[18px] inline-flex items-center'>
        <p className='font-bold'>{userName}</p>
        <p>님의 코스 플랜</p>
      </span>

      {courses.map((course, index) => (
        <CardCourse key={index} course={course} />
      ))}

      <FloatingWriteButton />
    </div>
  )
}
