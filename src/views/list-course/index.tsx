'use client'

import { CourseType, FavoriteRegionType } from '@/src/entities/course/type'
import CardCourseList from '@/src/features/course/card-list-course'
import Spacer from '@/src/shared/ui/Spacer'
import CourseList from '@/src/widgets/list-course'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, Suspense } from 'react'

interface ListCourseProps {
  trendingCourses: CourseType[]
  favoriteRegions: FavoriteRegionType[]
  courses: CourseType[]
}

function Main({ trendingCourses, favoriteRegions, courses }: ListCourseProps) {
  const searchParams = useSearchParams()
  const location = searchParams.get('location') as string
  const router = useRouter()

  if (location) {
    return <CourseList title={location} courses={courses} />
  }

  return (
    <div className='w-full h-[calc(100%-50px)] py-[20px] flex flex-col'>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center h-[40px] px-[20px]'>
          <div className='flex flex-col justify-start'>
            <span className='text-headline font-bold text-brand'>
              관심 지역
            </span>
            <span className='text-description text-[10px]'>
              지역별로 새로운, 인기 코스 확인해요
            </span>
          </div>

          <button
            className='border-none'
            onClick={() => {
              router.push('/courses/add-region')
            }}
          >
            추가하기
          </button>
        </div>

        <div className='flex flex-row items-center h-[30px] gap-[8px] my-[15px] overflow-auto px-[20px]'>
          {favoriteRegions.map((region) => (
            <div
              key={region.id}
              className='inline-block text-center whitespace-nowrap text-white font-bold text-[12px] h-[28px] rounded-[20px] px-[20px] py-[5px] bg-container-light-blue cursor-pointer'
              onClick={() => router.push(`/courses?location=${region.value}`)}
            >
              {region.value}
            </div>
          ))}
        </div>
      </div>

      <Spacer className='bg-bright-gray' height={8} />

      <div className='flex flex-col w-full px-[20px]'>
        <div className='flex flex-row justify-between items-center h-[40px] my-[20px]'>
          <div className='flex flex-col justify-start'>
            <span className='text-headline font-bold text-brand'>
              실시간 인기
            </span>
            <span className='text-description text-[10px]'>
              실시간 인기 코스를 확인해요
            </span>
          </div>

          <button className='border-none'>더보기</button>
        </div>

        <div className='flex flex-col items-center gap-[12px]'>
          {trendingCourses.map((course) => (
            <Fragment key={course.id}>
              <CardCourseList course={course} />
              <Spacer className='bg-bright-gray' height={8} />
            </Fragment>
          ))}
        </div>
      </div>
      <FloatingWriteButton />
    </div>
  )
}

export default function ListCourse({
  trendingCourses,
  favoriteRegions,
  courses,
}: ListCourseProps) {
  return (
    <Suspense>
      <Main
        trendingCourses={trendingCourses}
        favoriteRegions={favoriteRegions}
        courses={courses}
      />
    </Suspense>
  )
}
