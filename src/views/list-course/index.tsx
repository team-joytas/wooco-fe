'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/src/widgets/header'
import { useGetCourses, useGetMyLikeCourses } from '@/src/entities/course/query'
import {
  useDeleteMyLikeRegion,
  usePostMyLikeRegion,
} from '@/src/entities/user/query'
import useRegionStore, { LikeRegion } from '@/src/shared/store/regionStore'
import useUserStore from '@/src/shared/store/userStore'
import CourseListLayout from '@/src/widgets/course-list-layout'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import Spacer from '@/src/shared/ui/Spacer'
import { Select } from 'antd'

interface ListCourseProps {
  title?: string
}

export default function ListCourse({ title }: ListCourseProps) {
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
  const { user } = useUserStore()
  const [category, setCategory] = useState<string[]>(['ALL'])

  const onChangeCategories = (category: string[]) => {
    setCategory(category)
  }

  const regionId = useMemo(() => {
    return findLikedRegionId(likedRegions, currentRegion)
  }, [likedRegions, currentRegion])

  useEffect(() => {
    setIsLiked(!!regionId)
  }, [likedRegions, currentRegion])

  const { mutate: postLikeMutate } = usePostMyLikeRegion()
  const { mutate: deleteLikeMutate } = useDeleteMyLikeRegion()

  const { data: likeCourses } = useGetMyLikeCourses({
    id: user?.user_id || '',
  })

  const { data: courses } = useGetCourses({
    sort: order as 'recent' | 'popular',
    primary_region: currentRegion[0],
    secondary_region: currentRegion[1],
    category: category.includes('ALL') ? undefined : category[0],
  })

  const coursesData = title ? likeCourses : courses

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

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  if (!coursesData) return <div>Loading...</div>

  return (
    <div>
      <Header
        title={title ? title : currentRegion[1]}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={setIsListView}
        isHeart={title ? false : true}
        isLiked={isLiked}
        setIsLiked={handleClickLike}
      />

      <SelectCategories
        isList={true}
        prevCategories={category}
        setCategories={onChangeCategories}
      />

      <Spacer height={10} />

      <div className='w-full flex justify-end items-center'>
        <Select
          defaultValue='recent'
          style={{ width: 80 }}
          onChange={onChangeOrder}
          size={'small'}
          options={[
            { value: 'recent', label: '최신순' },
            { value: 'popular', label: '인기순' },
          ]}
        />
      </div>

      <CourseListLayout isListView={isListView} courses={coursesData} />
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
