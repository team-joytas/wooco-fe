'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/src/widgets/header'
import { useGetCourses } from '@/src/entities/course/query'
import {
  useDeleteMyLikeRegion,
  usePostMyLikeRegion,
} from '@/src/entities/user/query'
import useRegionStore, { LikeRegion } from '@/src/shared/store/regionStore'
import CourseListLayout from '@/src/widgets/course-list-layout'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import Spacer from '@/src/shared/ui/Spacer'
import { Select } from 'antd'

export default function ListCourse() {
  const [isListView, setIsListView] = useState(true)
  const [order, setOrder] = useState('recent')
  const {
    currentRegion,
    likedRegions,
    addLikedRegion,
    removeLikedRegion,
    setIsUpdated,
  } = useRegionStore()
  const [isLiked, setIsLiked] = useState(false)
  const [category, setCategory] = useState<string[]>(['ALL'])

  const regionId = useMemo(() => {
    return findLikedRegionId(likedRegions, currentRegion)
  }, [likedRegions, currentRegion])

  useEffect(() => {
    setIsLiked(!!regionId)
  }, [likedRegions, currentRegion])

  const { mutate: postLikeMutate } = usePostMyLikeRegion()
  const { mutate: deleteLikeMutate } = useDeleteMyLikeRegion()

  const { data: courses, isLoading } = useGetCourses({
    sort: order as 'recent' | 'popular',
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
          setIsUpdated(true)
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
            setIsUpdated(true)
          },
        }
      )
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Header
        title={currentRegion[1]}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={setIsListView}
        isHeart={true}
        isLiked={isLiked}
        setIsLiked={handleClickLike}
      />
      <SelectCategories
        isList={true}
        prevCategories={category}
        setCategories={(category: string[]) => {
          setCategory(category)
        }}
      />
      <Spacer height={10} />
      <div className='w-full flex px-[10px] justify-end items-center'>
        <Select
          defaultValue='recent'
          style={{ width: 80 }}
          onChange={(value) => setOrder(value)}
          size={'small'}
          options={[
            { value: 'recent', label: '최신순' },
            { value: 'popular', label: '인기순' },
          ]}
        />
      </div>
      <CourseListLayout isListView={isListView} courses={courses} />
    </div>
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
