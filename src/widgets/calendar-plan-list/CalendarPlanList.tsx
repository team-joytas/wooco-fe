import Image from 'next/image'
import { CalendarPlanType } from '@/src/entities/calendar/model'
import locationIcon from '@/src/assets/icon/location_fill_15.svg'
import personIcon from '@/src/assets/icon/profile_fill_15.svg'

interface CalendarPlanListProps {
  data?: CalendarPlanType[] | undefined
}

export default function CalendarPlanList({data}: CalendarPlanListProps) {
  if (!data) return null
  return (
    <div className='flex flex-col gap-[16px] items-center justify-start h-full'>
      {data.map((planData, index) => (
        <CalendarPlan key={index} {...planData} />
      ))}
    </div>
  )
}

function CalendarPlan(planData: CalendarPlanType) {
  return (
    <div className='w-full max-w-md p-5 rounded-xl bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)] hover:border-wooco_blue-primary border-2 transition-all cursor-pointer'>
      {/* Header */}
      <div className='flex items-center justify-between mb-3'>
        <h2 className='text-lg font-semibold text-gray-800'>
          {planData.title}
        </h2>
        <div
          className='flex items-center space-x-1 text-sm rounded-2xl py-1 px-3'
          style={{
            color: `#${planData.groupColor}`,
            backgroundColor: `#${planData.groupColor}1A`,
          }}
        >
          <span className='w-2 h-2 rounded-full inline-block'
          style={{
            backgroundColor: `#${planData.groupColor}`,
          }}/>
          <span className='text-sm font-medium'>{planData.groupName}</span>
        </div>
      </div>

      {/* Location Info */}
      <div className='flex items-center text-gray-600 text-sub02 font-sub02 mb-1 gap-2'>
        <Image src={locationIcon} alt='locationIcon' sizes='15' />
        <span>
          {planData.place.length > 0
            ? `${planData.place[0].name} 외 ${planData.place.length - 1}`
            : '0'}
          개 장소
        </span>
      </div>

      {/* Participant Info */}
      <div className='flex items-center text-gray-600 text-sub02 font-sub02 mb-4 gap-2'>
        <Image src={personIcon} alt='personIcon' sizes='15' />
        <span>참여자 {planData.groupSize}명</span>
      </div>

      {/* Buttons */}
      <div className='w-full flex gap-[7px]'>
        <button className='w-full h-[50px] rounded-lg bg-gray-150 text-gray-700 text-middle01 font-middle01 hover:bg-gray-300 transition'>
          장소 추가
        </button>
        <button className='w-full h-[50px] rounded-lg bg-gray-150 text-gray-700 text-middle01 font-middle01 hover:bg-gray-300 transition'>
          공유하기
        </button>
      </div>
    </div>
  )
}
