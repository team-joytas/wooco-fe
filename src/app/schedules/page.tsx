'use client'

import { useRouter } from 'next/navigation'
import getData from './getData'
import CourseCard from './components/CourseCard'
import { PlusOutlined } from '@ant-design/icons'

export default function Page() {
  const router = useRouter()
  const courseData = getData()
  const userName = courseData.user_name
  const planList = courseData.courses

  return (
    <div className='w-full pt-[20px] pb-[32px] px-[16px] flex flex-col'>
      <span className='border-b text-[18px] inline-flex items-center'>
        <p className='font-bold'>{userName}</p>
        <p>님의 코스 플랜</p>
      </span>

      {planList.map((course, index) => (
        <CourseCard key={index} courseData={course} />
      ))}

      <div className='fixed bottom-[60px] right-[20px] flex items-center justify-center cursor-pointer z-[50]'>
        <button
          className='w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-800 border-opacity-20'
          onClick={() => router.push('/schedules/new')}
        >
          <PlusOutlined className='text-[20px] text-blue-800' />
        </button>
      </div>
    </div>
  )
}
