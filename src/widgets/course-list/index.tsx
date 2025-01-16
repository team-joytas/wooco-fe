'use client'

import { useState } from 'react'
import Header from '../header'
import { Select } from 'antd'
import { categories } from '@/src/entities/category/type'
import { CourseType } from '@/src/entities/course/type'
import CardListCourse from '@/src/features/course/card-list-course'
import CardGridCourse from '@/src/features/course/card-grid-course'
import Spacer from '@/src/shared/ui/Spacer'

export default function CourseList({
  location,
  courses,
}: {
  location: string
  courses: CourseType[]
}) {
  const [isListView, setIsListView] = useState(true)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [order, setOrder] = useState('recent')

  const categoryList = [{ id: 0, value: '전체' }, ...categories]

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  return (
    <div className='w-full h-[calc(100%-50px)] pb-[20px] flex flex-col relative overflow-y-auto'>
      <Header
        title={location}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={setIsListView}
      />

      <div className='w-full h-[50px] py-[7px] text-[13px] text-center overflow-x-auto overflow-y-hidden whitespace-nowrap border-b border-container-blue'>
        {categoryList.map((category) => (
          <div
            key={category.id}
            className={`inline-block px-[13px] py-[5px] rounded-[20px] cursor-pointer ${
              category.id === currentCategory
                ? 'bg-container-blue text-white'
                : 'bg-white border border-container-blue text-container-blue'
            } mx-[2px]`}
            onClick={() => setCurrentCategory(category.id)}
          >
            {category.value}
          </div>
        ))}
      </div>

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
          {courses.map((course) => (
            <>
              <CardListCourse key={course.id} course={course} />
              <Spacer height={10} className='bg-bright-gray' />
            </>
          ))}
        </div>
      ) : (
        <>
          <Spacer height={15} />
          <div className='grid grid-cols-2 gap-[15px] px-[10px]'>
            {courses.map((course) => (
              <CardGridCourse key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
