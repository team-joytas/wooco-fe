'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/src/widgets/header'
import { useGetCourses } from '@/src/entities/course'
import useRegionStore, { LikeRegion } from '@/src/shared/store/regionStore'
import CourseListLayout from '@/src/widgets/course-list-layout'
import { Spacer, SelectCategories } from '@/src/shared/ui'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { useDeleteMyLikeRegion, usePostMyLikeRegion } from '@/src/entities/user'
import { SelectSort } from '@/src/features'

export default function ListCourse() {
  const [isListView, setIsListView] = useState(true)
  const [order, setOrder] = useState<'RECENT' | 'POPULAR'>('RECENT')
  const { currentRegion, likedRegions, addLikedRegion, removeLikedRegion } =
    useRegionStore()
  const [isLiked, setIsLiked] = useState(false)
  const [category, setCategory] = useState<string[]>(['ALL'])

  const regionId = useMemo(() => {
    return findLikedRegionId(likedRegions, currentRegion)
  }, [likedRegions, currentRegion])

  useEffect(() => {
    setIsLiked(!!regionId)
  }, [likedRegions, currentRegion])

  useEffect(() => {
    const isListView = sessionStorage.getItem('is-list')
    if (isListView) {
      setIsListView(isListView === 'true')
    }
  }, [])

  const { mutate: postLikeMutate } = usePostMyLikeRegion()
  const { mutate: deleteLikeMutate } = useDeleteMyLikeRegion()

  const { data: courses, isLoading } = useGetCourses({
    sort: order as 'RECENT' | 'POPULAR',
    primary_region: currentRegion[0],
    secondary_region: currentRegion[1],
    category: category.includes('ALL') ? undefined : category[0],
  })

  const handleClickLike = () => {
    if (isLiked) {
      setIsLiked(false)

      deleteLikeMutate(regionId, {
        onSuccess: () => {
          removeLikedRegion(regionId)
        },
      })
    } else {
      setIsLiked(true)

      postLikeMutate(
        {
          primary_region: currentRegion[0],
          secondary_region: currentRegion[1],
        },
        {
          onSuccess: (data) => {
            addLikedRegion({
              id: data.id,
              primary_region: currentRegion[0],
              secondary_region: currentRegion[1],
            })
          },
        }
      )
    }
  }

  const handleSetIsListView = (isListView: boolean) => {
    setIsListView(isListView)
    sessionStorage.setItem('is-list', String(isListView))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Header
        title={currentRegion[1]}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={handleSetIsListView}
        isHeart={true}
        isLiked={isLiked}
        setIsLiked={handleClickLike}
      />
      <SelectCategories
        isInCourseList={true}
        prevCategories={category}
        setCategories={(category: string[]) => {
          setCategory(category)
        }}
      />
      <Spacer height={10} />
      <div className='w-full flex flex-col px-[22px] gap-[10px] justify-center items-end'>
        <SelectSort order={order} setOrder={setOrder} />
        <CourseListLayout isListView={isListView} courses={courses} />
      </div>
      <FloatingWriteButton />
    </>
  )
}

const findLikedRegionId = (
  likedRegions: LikeRegion[],
  currentRegion: string[]
): string => {
  const matchedRegion = likedRegions.find(
    (region) =>
      region.primary_region === currentRegion[0] &&
      region.secondary_region === currentRegion[1]
  )

  return matchedRegion ? matchedRegion.id : ''
}
