'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { CourseType, useGetCourses } from '@/src/entities/course'
import { useGetMyLikeRegions } from '@/src/entities/user'
import { Spacer, RegionCascaderWithLikes, useToast } from '@/src/shared/ui'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import useRegionStore from '@/src/shared/store/regionStore'
import { CourseListCard, SkeletonCourseListCard } from '@/src/features'
import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import Image from 'next/image'
import Link from 'next/link'
import useUserStore from '@/src/shared/store/userStore'

export default function MainCourse() {
  const router = useRouter()
  const { setLikedRegions, likedRegions, setCurrentRegion, currentRegion } =
    useRegionStore()
  const { data: courses, isLoading } = useGetCourses({ sort: 'POPULAR' })
  const { data: likeRegions } = useGetMyLikeRegions(likedRegions)
  const { user } = useUserStore()
  const { show } = useToast()

  const onChangeRegion = (value: string[]) => {
    useRegionStore.setState({ currentRegion: value })
    router.push(`/courses/by-region`)
  }

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'unset'
  }, [isLoading])

  useEffect(() => {
    if (likeRegions) setLikedRegions(likeRegions)
  }, [likeRegions])

  useEffect(() => {
    if (!currentRegion) setCurrentRegion([])
  }, [])

  const handleWishlistClick = (e:React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      show('로그인이 필요합니다.')
      router.push('/login')
    }
  }

  const regionCascaderProps = {
    setRegion: onChangeRegion,
    placeholder: '관심 지역 등록하고 빠르게 코스들 구경해요',
    likedRegions:
      !isLoading && likeRegions
        ? likeRegions.map((region) => ({
            id: region.id,
            primary_region: region.primary_region,
            secondary_region: region.secondary_region,
          }))
        : [],
    clickable: !isLoading,
  }

  return (
    <div className='w-full h-full py-[10px] flex flex-col'>
      <RegionCascaderWithLikes {...regionCascaderProps} />
      <Spacer height={11} />
      <Spacer className='bg-bright-gray' height={8} />
      <div className='flex flex-col w-full mb-[3px]'>
        <Spacer height={15} />
        <div className='flex flex-row px-[20px]'>
          <div className='flex flex-col w-[228px] justify-start gap-[3px]'>
            <span className='text-headline02 font-bold text-brand'>
              Weekly Best
            </span>
            <span className='text-description text-sub02 font-sub02'>
              이번 주 가장 인기 있는 코스 구경하고 저장해요
            </span>
          </div>
          <div className='flex flex-col justify-center'>
            <Link
              href={user ? `/users/${user.user_id}/wishlist` : '/login'}
              onClick={handleWishlistClick}
              className='w-[100px] h-[32px] px-[10px] py-[6px] bg-gray-100 rounded-[10px] flex items-center justify-center gap-[4px]'
            >
              <span className='text-middle01'>찜 목록</span>
              <Image
                src={heart_fill as string}
                alt='heart'
                height={20}
                width={21}
              />
            </Link>
          </div>
        </div>
        <Spacer height={17} />
        <div className='flex flex-col items-center px-[22px] gap-[15px]'>
          {isLoading || !courses
            ? Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCourseListCard key={i} />
              ))
            : courses.map((course: CourseType) => (
                <CourseListCard course={course} key={course.id} />
              ))}
        </div>
      </div>
      <FloatingWriteButton />
    </div>
  )
}
