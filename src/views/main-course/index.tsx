'use client'

import { CourseType } from '@/src/entities/course'
import { CourseListCard } from '@/src/features'
import Spacer from '@/src/shared/ui/Spacer'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { useGetCourses } from '@/src/entities/course'
import { useGetMyLikeRegions } from '@/src/entities/user'
import RegionCascaderWithLikes from '@/src/shared/ui/RegionCascader'
import useRegionStore from '@/src/shared/store/regionStore'

export default function MainCourse() {
  const router = useRouter()
  const { data: courses } = useGetCourses({ sort: 'POPULAR' })
  const { setLikedRegions, likedRegions, setCurrentRegion, currentRegion } =
    useRegionStore()
  const { data: likeRegions } = useGetMyLikeRegions(likedRegions)

  useEffect(() => {
    if (!likeRegions) return
    setLikedRegions(likeRegions)
  }, [likeRegions])

  useEffect(() => {
    // "/courses" 페이지 진입시 저장소의 currentRegion 값 초기화
    if (!currentRegion) return
    setCurrentRegion([])
  }, [])

  if (!courses) return <div>Loading...</div>

  const onChangeRegion = (value: string[]) => {
    useRegionStore.setState({ currentRegion: value })
    router.push(`/courses/by-region`)
  }

  return (
    <div className='w-full h-full py-[10px] flex flex-col'>
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
      <div className='flex flex-col w-full mb-[3px]'>
        <Spacer height={15} />
        <div className='flex flex-col justify-start gap-[3px] px-[20px]'>
          <span className='text-headline font-bold text-brand'>New</span>
          <span className='text-description text-sub'>
            최근 유저들이 작성한 코스 구경하고 저장해요
          </span>
        </div>
        <Spacer height={17} />
        <div className='flex flex-col items-center px-[22px] gap-[15px]'>
          {courses.map((course: CourseType) => (
            <CourseListCard course={course} key={course.id} />
          ))}
        </div>
      </div>
      <FloatingWriteButton />
    </div>
  )
}
