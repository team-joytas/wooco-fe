'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import { DatePicker } from 'antd'
import SearchPlace from '@/src/views/search-place'
import { useState } from 'react'
import DragPlace from '@/src/widgets/drag-place'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { CourseMockType } from '@/src/entities/course/type'
import { PlaceType } from '@/src/entities/place/type'

interface UpdatePlanProps {
  data: CourseMockType
}

export default function UpdatePlan({ data }: UpdatePlanProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<PlaceType[]>(data.places)
  const [date, setDate] = useState<string>('2024-12-25')
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)

  dayjs.extend(customParseFormat)

  const dateFormat = 'YYYY-MM-DD'

  const submitPlan = () => {
    router.push('/plans')
  }

  return (
    // <div className='w-full h-[calc(100%-50px)] pt-[20px] pb-[20px] px-[16px] flex flex-col relative'>
    //   <div className='border-b text-[18px] inline-flex items-center'>
    //     <ArrowLeftOutlined
    //       className='text-[15px] cursor-pointer mr-[10px]'
    //       onClick={() => router.back()}
    //     />
    //     <p className='font-semi-bold'>{data.location} 코스 플랜</p>
    //   </div>

    //   {/* 실제 API 연결 필요 */}
    //   <KakaoMap places={[]} id={Number(data.id)} />

    //   <section className='flex flex-col mt-[20px] gap-[10px]'>
    //     <span className='text-[15px] font-semi-bold'>| 장소 추가</span>
    //     <DragPlace places={places} setPlaces={setPlaces} />
    //     <button
    //       onClick={() => setOpenSearchPlace(true)}
    //       className='w-full h-[40px] text-[15px] rounded-[5px] border border-blue-100 flex items-center justify-center'
    //     >
    //       +
    //     </button>
    //     {openSearchPlace && (
    //       <SearchPlace
    //         setOpenSearchPlace={setOpenSearchPlace}
    //         setPlaces={setPlaces}
    //       />
    //     )}
    //   </section>

    //   <section className='flex flex-row absolute justify-between bottom-[20px] left-0 right-0 px-[16px] gap-[10px]'>
    //     <DatePicker
    //       placeholder='날짜를 선택해 주세요'
    //       style={{ width: '100%' }}
    //       defaultValue={dayjs(data.planned_for, dateFormat)}
    //       onChange={(date, dateString) => setDate(String(dateString))}
    //     />
    //     <button
    //       className={`bottom-[10px] w-[80px] text-white bg-blue-100 rounded-[5px] px-[10px] py-[5px] text-[13px] font-semi-bold
    //                 ${
    //                   places.length === 0 || !date
    //                     ? 'cursor-default'
    //                     : 'bg-blue-800 bg-opacity-50'
    //                 }`}
    //       disabled={places.length === 0 || !date}
    //       onClick={submitPlan}
    //     >
    //       수정
    //     </button>
    //   </section>
    // </div>
    null
  )
}
