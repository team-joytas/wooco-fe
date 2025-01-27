'use client'

import { CourseType } from '@/src/entities/course/type'
import CardCourseList from '@/src/features/course/card-list-course'
import Spacer from '@/src/shared/ui/Spacer'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { useGetCourses } from '@/src/entities/course/query'
import { useGetMyLikeRegions } from '@/src/entities/user/query'
import RegionCascaderWithLikes from '@/src/shared/ui/RegionCascader'
import useRegionStore from '@/src/shared/store/regionStore'

export default function MainCourse() {
  const router = useRouter()
  const { data: courses } = useGetCourses({ sort: 'popular' })
  const { data: likeRegions } = useGetMyLikeRegions()
  const { setCurrentRegion, likedRegions, isUpdated } = useRegionStore()

  useEffect(() => {
    setCurrentRegion([])
  }, [isUpdated, likeRegions])

  if (!courses || !likeRegions) return <div>Loading...</div>

  const onChangeRegion = (value: string[]) => {
    useRegionStore.setState({ currentRegion: value })
    router.push(`/courses/by-region`)
  }

  return (
    <div className='w-full h-full py-[20px] flex flex-col'>
      <RegionCascaderWithLikes
        setRegion={onChangeRegion}
        placeholder='관심 지역 등록하고 빠르게 코스들 구경해요'
        likedRegions={
          likedRegions?.map((region) => ({
            id: region.id,
            primary_region: region.primary_region,
            secondary_region: region.secondary_region,
          })) || []
        }
      />

      <Spacer height={11} />
      <Spacer className='bg-bright-gray' height={8} />

      <div className='flex flex-col w-full px-[20px]'>
        <div className='flex flex-col mt-[15px] justify-start'>
          <span className='text-headline font-bold text-brand'>
            실시간 인기
          </span>
          <span className='text-description text-[10px]'>
            실시간 인기 코스를 확인해요
          </span>
        </div>
        <div className='flex flex-col items-center gap-[12px]'>
          {courses.slice(0, 5).map((course: CourseType) => (
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
