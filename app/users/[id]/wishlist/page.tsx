'use client'

import { useGetLikeCourses } from '@/src/entities/user/api'
import { ActionHeader, CourseListLayout } from '@/src/widgets'
import { Spacer, SelectCategories } from '@/src/shared/ui'
import { useEffect, useState } from 'react'
import { SelectSort } from '@/src/features'
import { NoLikedCourse } from '@/src/entities/course'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
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

  return (
    <>
      <ActionHeader
        title={'찜 목록'}
        showLike={false}
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
      <div className='w-full flex flex-col px-[22px] gap-[10px] justify-center items-start'>
        <SelectSort order={order} setOrder={setOrder} />
        {likeCourses?.length === 0 ? (
          <NoLikedCourse />
        ) : (
          <CourseListLayout
            isListView={isListView}
            courses={isLoading ? undefined : likeCourses}
          />
        )}
      </div>
    </>
  )
}
