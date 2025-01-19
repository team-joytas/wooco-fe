'use client'

import CardCourse from '@/src/features/course/card-course'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { useGetCourses } from '@/src/entities/course/query'
import { useGetMyProfile } from '@/src/entities/user/query'
import type { CourseType } from '@/src/entities/course/type'

export default function Page() {
  const { data: courses } = useGetCourses({ sort: 'recent' })
  const { data: user } = useGetMyProfile()

  return (
    <div className='w-full pt-[20px] pb-[20px] px-[16px] flex flex-col'>
      <span className='border-b text-[18px] inline-flex items-center'>
        <p className='font-bold'>{user?.name}</p>
        <p>님의 코스 플랜</p>
      </span>

      {courses?.map((course: CourseType, index: number) => (
        <CardCourse key={index} course={course} />
      ))}

      <FloatingWriteButton />
    </div>
  )
}
