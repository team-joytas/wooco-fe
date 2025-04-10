'use client'

import Link from 'next/link'
import { CoursePlanCard, SkeletonCoursePlanCard } from '@/src/features'
import { Spacer } from '@/src/shared/ui'
import type { CourseType } from '@/src/entities/course'
import { useGetCourses } from '@/src/entities/course'
import { useEffect } from 'react'

export function SectionNewCourse() {
  const { data: courses, isLoading } = useGetCourses({
    sort: 'RECENT',
    limit: 4,
  })

  useEffect(() => {
    // 로딩 중일때 스크롤 금지
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

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
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCoursePlanCard key={index} />
            ))
          : courses.map((course: CourseType) => (
              <CoursePlanCard key={course.id} data={course} />
            ))}
      </div>
      <Spacer height={22} />
    </section>
  )
}
