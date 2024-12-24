'use client'

import { useRouter } from 'next/navigation'
import { Course } from '../getData'
import KakaoMap from '@/app/components/KakaoMap'
import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'

export default function CourseCard({ courseData }: { courseData: Course }) {
  const { location, places, planned_for, id } = courseData
  const router = useRouter()

  const [messageApi, contextHolder] = message.useMessage()
  const toast = (address: string) => {
    // 클립보드에 복사
    navigator.clipboard.writeText(address).then(() => {
      // 토스트 메시지
      messageApi.open({
        type: 'success',
        content: '주소가 클립보드에 복사되었습니다.',
        duration: 1,
      })
    })
  }

  return (
    <div className='w-full bg-white rounded-[8px] py-[16px] mt-[10px] items-center border-b'>
      <div className='flex flex-col justify-start  ml-[8px]'>
        <span className='text-[12px] text-[#999999]'>{planned_for}</span>
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='font-bold text-[16px]'>{location}</span>
          <span
            className='underline text-[12px] text-gray mr-[8px] cursor-pointer'
            onClick={() => {
              router.push('/courses/new')
            }}
          >
            코스로 공유하기
          </span>
        </div>
      </div>

      <KakaoMap places={places} id={parseInt(id)} />

      <section className='flex flex-col mt-[20px] text-[15px]'>
        <div className='flex flex-row justify-between items-center'>
          <span>| 장소 정보</span>
          <button
            className='w-[50px] h-[30px] text-[12px] border rounded-[10px] cursor-pointer'
            onClick={() => router.push('/schedules/1/update')}
          >
            수정
          </button>
        </div>
        {places.map((place, index) => (
          <div
            key={index}
            className='flex flex-row mt-[5px] gap-[5px] bg-gray-100 px-[15px] py-[8px] rounded-[10px] justify-between items-center'
          >
            <div className='flex flex-col items-start'>
              <span className='text-[13px] font-bold'>{place.place_name}</span>
              <span className='text-[10px] text-gray-600'>
                {place.address_name}
              </span>
            </div>
            <CopyOutlined
              className='w-[12px] h-[12px] cursor-pointer'
              onClick={() => toast(place.address_name)}
            />
          </div>
        ))}
      </section>

      {contextHolder}
    </div>
  )
}
