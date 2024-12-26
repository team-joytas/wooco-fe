'use client'

import { useState } from 'react'

import ProfileImage from '@/app/components/ProfileImage'
import ProfileTag from './components/ProfileTag'
import getData from './getData'
import PlaceListComponent from './components/PlaceListComponent'
import CourseListComponent from './components/CourseListComponent'
import { Select } from 'antd'
import { useRouter } from 'next/navigation'

interface Place {
  id: number
  name: string
  star_rate: string
  created_at: string
  tags: string[]
  images: string[]
  content: string
}

interface Course {
  id: number
  name: string
  location: string
  categories: string[]
  image: string
  likes: number
  comments: number
  views: number
}

export default function Page() {
  const data = getData()
  const [type, setType] = useState('장소')
  const [order, setOrder] = useState('recent')
  const places: Place[] = data.place_info.places
  const courses: Course[] = data.course_info.courses
  const router = useRouter()

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  const handleTypeChange = (newType: string) => {
    setType(newType)
  }

  return (
    <div className='px-16 py-32'>
      <div className='flex items-center justify-between'>
        <ProfileImage size={60} src={data.user_info.profile_url} />
        <div className='flex gap-[30px] '>
          <ProfileTag
            content={data.place_info.summary.total_place}
            title='장소 리뷰'
          />
          <ProfileTag
            content={data.place_info.summary.total_place}
            title='코스 리뷰'
          />
          <ProfileTag
            content={data.place_info.summary.star_rate_avg}
            title='평균 평점'
          />
        </div>
      </div>
      <div className='mt-[20px] flex justify-between'>
        <span className='font-semibold text-[20px]'>{data.user_info.name}</span>
        <button
          className='text-[14px] w-[72px] h-[32px] border'
          onClick={() => {
            router.push('/users/1/setting')
          }}
        >
          수정하기
        </button>
      </div>
      <div
        className='sticky top-0 bg-white z-10 mt-[10px] flex items-center '
        style={{ paddingTop: '10px', paddingBottom: '10px' }}
      >
        <div
          className={`w-[50%] h-[40px] flex justify-center items-center text-[16px] cursor-pointer ${
            type === '장소' ? 'border-b-2 border-cyan-500 font-semibold' : ''
          }`}
          onClick={() => handleTypeChange('장소')}
        >
          장소
        </div>
        <div
          className={`w-[50%] h-[40px] flex justify-center items-center text-[16px] cursor-pointer ${
            type === '코스' ? 'border-b-2 border-cyan-500 font-semibold' : ''
          }`}
          onClick={() => handleTypeChange('코스')}
        >
          코스
        </div>
      </div>
      <div className='mt-[20px] flex justify-between'>
        <div className='flex gap-[5px] items-center'>
          <span className='text-[14px]'>전체</span>
          <span className='text-[16px] text-cyan-500'>
            {type === '장소'
              ? data.place_info.summary.total_place
              : data.course_info.summary.total_course}
          </span>
        </div>
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
      {type === '장소' ? (
        <PlaceListComponent data={places} />
      ) : (
        <CourseListComponent data={courses} />
      )}
    </div>
  )
}
