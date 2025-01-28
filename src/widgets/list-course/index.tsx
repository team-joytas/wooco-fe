'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/src/widgets/header'
import { Select } from 'antd'
import { CourseType } from '@/src/entities/course/type'
import CardListCourse from '@/src/features/course/card-list-course'
import CardGridCourse from '@/src/features/course/card-grid-course'
import Spacer from '@/src/shared/ui/Spacer'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import { useGetCourses } from '@/src/entities/course/query'
import { Fragment } from 'react'
import {
  useDeleteMyLikeRegion,
  usePostMyLikeRegion,
} from '@/src/entities/user/query'
import useRegionStore, { LikeRegion } from '@/src/shared/store/regionStore'

// TODO: 카테고리 설정

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

  const regionId = useMemo(() => {
    return findLikedRegionId(likedRegions, currentRegion)
  }, [likedRegions, currentRegion])

  useEffect(() => {
    setIsLiked(!!regionId)
  }, [likedRegions, currentRegion])

  const { mutate: postLikeMutate } = usePostMyLikeRegion()
  const { mutate: deleteLikeMutate } = useDeleteMyLikeRegion()

  const { data: coursesByRegion } = useGetCourses({
    sort: order as 'recent' | 'popular',
    primary_region: currentRegion[0],
    secondary_region: currentRegion[1],
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

  if (!coursesByRegion) return <div>Loading...</div>

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  return (
    <div>
      <Header
        title={currentRegion[1]}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={setIsListView}
        isLiked={isLiked}
        setIsLiked={handleClickLike}
      />

      <SelectCategories isList={true} />

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

      {isListView ? (
        <div className='flex flex-col justify-between items-center px-[10px]'>
          {coursesByRegion.map((course: CourseType) => (
            <Fragment key={course.id}>
              <CardListCourse course={course} />
              <Spacer height={10} className='bg-bright-gray' />
            </Fragment>
          ))}
        </div>
      ) : (
        <>
          <Spacer height={15} />
          <div className='grid grid-cols-2 gap-[15px] px-[10px]'>
            {coursesByRegion.map((course: CourseType) => (
              <CardGridCourse key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
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
