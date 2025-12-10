'use client'

import { useEffect, useMemo, useState } from 'react'
import { ActionHeader, CourseListLayout } from '@/src/widgets'
import { useGetCourses } from '@/src/entities/course'
import useRegionStore, { LikeRegion } from '@/src/shared/store/regionStore'
import { Spacer, SelectCategories } from '@/src/shared/ui'
import { useDeleteMyLikeRegion, usePostMyLikeRegion } from '@/src/entities/user'
import { SelectSort, FloatingWriteButton } from '@/src/features'
import { useAuth, useToast } from '@/src/shared/providers'

interface RegionCourseProps {
  primary: string
  secondary: string
}

export function RegionCourse({ primary, secondary }: RegionCourseProps) {
  const [isListView, setIsListView] = useState(true)
  const [order, setOrder] = useState<'RECENT' | 'POPULAR'>('RECENT')
  const { likedRegions, addLikedRegion, removeLikedRegion, setSelectedRegion } =
    useRegionStore()
  const [isLiked, setIsLiked] = useState(false)
  const [category, setCategory] = useState<string[]>(['ALL'])
  const { show } = useToast()
  const { token } = useAuth()

  const regionId = useMemo(() => {
    return findLikedRegionId(likedRegions, [
      primary as string,
      secondary as string,
    ])
  }, [likedRegions, primary, secondary])

  useEffect(() => {
    setIsLiked(!!regionId)
  }, [likedRegions, regionId])

  useEffect(() => {
    const isListView = sessionStorage.getItem('is-list')
    if (isListView) {
      setIsListView(isListView === 'true')
    }

    setSelectedRegion([primary, secondary])

    return () => {
      setSelectedRegion([])
    }
  }, [])

  const { mutate: postLikeMutate } = usePostMyLikeRegion()
  const { mutate: deleteLikeMutate } = useDeleteMyLikeRegion()
  const { data: courses, isLoading } = useGetCourses({
    sort: order as 'RECENT' | 'POPULAR',
    primary_region: primary as string,
    secondary_region: secondary as string,
    category: category.includes('ALL') ? undefined : category[0],
  })

  const handleClickLike = () => {
    if (!token) {
      show('warning', '로그인 후 이용해주세요')
      return
    }

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
          primary_region: primary as string,
          secondary_region: secondary as string,
        },
        {
          onSuccess: (data) => {
            addLikedRegion({
              id: data.id,
              primary_region: primary as string,
              secondary_region: secondary as string,
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

  useEffect(() => {
    // 로딩 중일때 스크롤 금지
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <>
      <ActionHeader
        title={secondary as string}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={handleSetIsListView}
        showLike={true}
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
      <div className='w-full flex flex-col px-[22px] gap-[10px] justify-center items-start'>
        <SelectSort order={order} setOrder={setOrder} />
        <CourseListLayout
          isListView={isListView}
          courses={isLoading ? undefined : courses}
        />
      </div>
      <FloatingWriteButton />
    </>
  )
}

const findLikedRegionId = (
  likedRegions: LikeRegion[],
  selectedRegion: string[]
): string => {
  const matchedRegion = likedRegions.find(
    (region) =>
      region.primary_region === selectedRegion[0] &&
      region.secondary_region === selectedRegion[1]
  )

  return matchedRegion ? matchedRegion.id : ''
}
