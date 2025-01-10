'use client'

import { useState } from 'react'

import ProfileImage from '@/app/components/ProfileImage'
import ProfileTag from './components/ProfileTag'
import getData from './getData'
import PlaceListComponent from './components/PlaceListComponent'
import CourseListComponent from './components/CourseListComponent'
import { Select } from 'antd'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Spacer from '@components/(layout)/Spacer'
import FloatingWriteButton from '@components/FloatingWriteButton'
import setting from '@images/setting.png'
import Image from 'next/image'
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

const LIST_TYPE = {
  place: 'place' as const,
  course: 'course' as const,
}

type ListType = keyof typeof LIST_TYPE

export default function Page() {
  const data = getData()
  const [type, setType] = useState<ListType>(LIST_TYPE.place)
  const [order, setOrder] = useState('recent')
  const places: Place[] = data.place_info.places
  const courses: Course[] = data.course_info.courses
  const router = useRouter()

  const onChangeOrder = (value: string) => {
    setOrder(value)
  }

  const handleTypeChange = (newType: ListType) => {
    setType(newType)
  }

  return (
    <>
      <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <button onClick={() => router.back()}>
          <ChevronLeft size={24} color='black' strokeWidth={1.5} />
        </button>
        <p className='font-semibold text-[17px]'>마이 페이지</p>
        <Link href='/users/1/setting'>
          <Image width={24} height={24} alt='setting' src={setting} />
        </Link>
      </header>
      <Spacer height={8} />
      <section className='px-[20px] py-[10px] gap-[5px] w-full flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-center gap-[10px]'>
            <ProfileImage
              size={60}
              src={data.user_info.profile_url}
              type='colored'
            />
            <p className='font-bold text-brand text-headline'>
              {data.user_info.name}
            </p>
          </div>
          <div className='flex gap-[30px] items-end'>
            <ProfileTag
              type='heart'
              content={data.place_info.summary.total_place}
            />
            <ProfileTag
              type='comment'
              content={data.place_info.summary.total_place}
            />
            <ProfileTag
              type='rate'
              content={data.place_info.summary.star_rate_avg}
            />
          </div>
        </div>
      </section>
      <div className='sticky top-0 bg-white z-10 flex items-center pt-[10px] pb-[5px]'>
        <div
          className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center font-semibold text-middle cursor-pointer ${
            type === LIST_TYPE.place
              ? ' border-container-light-blue'
              : 'border-light-gray text-gray-400'
          }`}
          onClick={() => handleTypeChange(LIST_TYPE.place)}
        >
          장소 리뷰
        </div>
        <div
          className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center font-semibold text-middle cursor-pointer ${
            type === LIST_TYPE.course
              ? ' border-container-light-blue '
              : 'border-light-gray text-gray-400'
          }`}
          onClick={() => handleTypeChange(LIST_TYPE.course)}
        >
          나의 코스
        </div>
      </div>
      <Spacer height={10} />
      <div className='flex px-[20px] justify-between'>
        <div className='flex gap-[5px] text-main font-bold items-center'>
          <span>전체</span>
          <span className='text-container-blue'>
            {type === LIST_TYPE.place
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
      <Spacer height={10} />
      <Spacer height={8} className='bg-bright-gray' />
      {type === LIST_TYPE.place ? (
        <PlaceListComponent data={places} />
      ) : (
        <CourseListComponent data={courses} />
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
