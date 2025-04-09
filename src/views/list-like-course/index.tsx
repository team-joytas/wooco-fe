'use client'

import { useGetLikeCourses } from '@/src/entities/user/api'
import Header from '@/src/widgets/header'
import { Spacer, SelectCategories } from '@/src/shared/ui'
import CourseListLayout from '@/src/widgets/course-list-layout'
import { useEffect, useState } from 'react'
import { NoLikedCourse, SelectSort } from '@/src/features'

interface ListLikeCourseProps {
  id: string
}

export default function ListLikeCourse({ id }: ListLikeCourseProps) {
  const [isListView, setIsListView] = useState(true)
  const [category, setCategory] = useState<string[]>(['ALL'])
  const [order, setOrder] = useState<'RECENT' | 'POPULAR'>('RECENT')

  const { data: likeCourses, isLoading } = useGetLikeCourses({
    id,
    sort: order as 'RECENT' | 'POPULAR',
    category: category.includes('ALL') ? undefined : category[0],
  })

  const handleSetIsListView = (isListView: boolean) => {
    setIsListView(isListView)
    sessionStorage.setItem('is-list', String(isListView))
  }

  useEffect(() => {
    const isListView = sessionStorage.getItem('is-list')
    if (isListView) {
      setIsListView(isListView === 'true')
    }
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Header
        title={'관심 목록'}
        isHeart={false}
        isLiked={false}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={handleSetIsListView}
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
        {likeCourses?.length === 0 ? (
          <NoLikedCourse />
        ) : (
          <CourseListLayout isListView={isListView} courses={likeCourses} />
        )}
      </div>
    </>
  )
}
