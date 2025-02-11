'use client'

import { useGetLikeCourses } from '@/src/entities/course/query'
import Header from '@/src/widgets/header'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import Spacer from '@/src/shared/ui/Spacer'
import CourseListLayout from '@/src/widgets/course-list-layout'
import { Select } from 'antd'
import { useState } from 'react'
import NoLikedCourse from '@/src/shared/ui/NoLikedCourse'

interface ListLikeCourseProps {
  id: string
}

export default function ListLikeCourse({ id }: ListLikeCourseProps) {
  const [isListView, setIsListView] = useState(true)
  const [category, setCategory] = useState<string[]>(['ALL'])
  const [order, setOrder] = useState('recent')

  const { data: likeCourses, isLoading } = useGetLikeCourses({
    id,
    order: order as 'recent' | 'popular',
  })

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
        setIsListView={setIsListView}
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
      {likeCourses?.length === 0 ? (
        <NoLikedCourse />
      ) : (
        <CourseListLayout isListView={isListView} courses={likeCourses || []} />
      )}
    </div>
  )
}
