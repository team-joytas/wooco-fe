'use client'

import { useState, useEffect } from 'react'
import Header from '@/src/widgets/header'
import { Select } from 'antd'
import { CourseType } from '@/src/entities/course/type'
import CardListCourse from '@/src/features/course/card-list-course'
import CardGridCourse from '@/src/features/course/card-grid-course'
import Spacer from '@/src/shared/ui/Spacer'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import { getCourses } from '@/src/entities/course/api'
import { Fragment } from 'react'

export default function ListCourse({ title }: { title: string }) {
  const [isListView, setIsListView] = useState(true)
  const [courses, setCourses] = useState<CourseType[]>([])
  const [order, setOrder] = useState('recent')

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCourses({
        sort: order || 'recent',
        secondary_region: title,
      })
      setCourses(courses)
    }
    fetchData()
  }, [order, title])

  return (
    <div className='w-full h-[calc(100%-50px)] pb-[20px] flex flex-col relative overflow-y-auto'>
      <Header
        title={title}
        isTitleTag={true}
        isBack
        isListView={isListView}
        setIsListView={setIsListView}
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
          {courses.map((course) => (
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
            {courses.map((course) => (
              <CardGridCourse key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
