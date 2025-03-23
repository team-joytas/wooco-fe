'use client'

import Link from 'next/link'
import { CoursePlanCard } from '@/src/features'
import Spacer from '@/src/shared/ui/Spacer'
import type { CourseType } from '@/src/entities/course'
import { useGetCourses } from '@/src/entities/course'

export default function SectionNewCourse() {
  const { data: courses } = useGetCourses({ sort: 'RECENT', limit: 4 })

  if (!courses) return <div>Loading...</div>

  return (
    <section className='w-full h-fit px-[22px] py-[7px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-headline text-brand font-bold'>New</p>
          <span className='text-sub text-black opacity-50'>
            이번 주 새로운 공유된 코스들을 구경하고 저장해보세요
          </span>
        </div>
        <Link href='/courses' className='text-[10px] text-black opacity-50'>
          더보기
        </Link>
      </div>
      <Spacer height={22} />
      <div className='flex flex-col gap-[15px]'>
        {courses?.map((course: CourseType) => (
          <CoursePlanCard key={course.id} data={course} />
        ))}
      </div>
      <Spacer height={22} />
    </section>
  )
}
