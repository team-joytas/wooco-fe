'use client'

import { useGetLikeCourses } from '@/src/entities/user/api'
import Header from '@/src/widgets/header'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import Spacer from '@/src/shared/ui/Spacer'
import CourseListLayout from '@/src/widgets/course-list-layout'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import NoLikedCourse from '@/src/shared/ui/NoLikedCourse'

interface ListLikeCourseProps {
  id: string
}

export default function ListLikeCourse({ id }: ListLikeCourseProps) {
  const [isListView, setIsListView] = useState(true)
  const [category, setCategory] = useState<string[]>(['ALL'])
  const [order, setOrder] = useState('RECENT')

  useEffect(() => {
    const isListView = sessionStorage.getItem('is-list-like')
    if (isListView) {
      setIsListView(isListView === 'true')
    }
  }, [])

  const { data: likeCourses, isLoading } = useGetLikeCourses({
    id,
    order: order as 'RECENT' | 'POPULAR',
  })

  const handleSetIsListView = (isListView: boolean) => {
    setIsListView(isListView)
    sessionStorage.setItem('is-list-like', String(isListView))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
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
      <div className='w-full flex px-[10px] justify-end items-center'>
        <Select
          defaultValue='RECENT'
          style={{ width: 80 }}
          onChange={(value) => setOrder(value)}
          size={'small'}
          options={[
            { value: 'RECENT', label: '최신순' },
            { value: 'POPULAR', label: '인기순' },
          ]}
        />
      </div>
      {likeCourses?.length === 0 ? (
        <NoLikedCourse />
      ) : (
        <CourseListLayout isListView={isListView} courses={likeCourses || []} />
      )}
    </div>
  )
}
