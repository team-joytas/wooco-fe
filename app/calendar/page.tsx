'use client'

import CalendarPlanList from '@/src/widgets/calendar-plan-list/CalendarPlanList'
import DatePicker, { PlansByDate, dateKey } from '@/src/widgets/date-pikcker/DatePicker'
import crossIcon from '@/src/assets/icon/cross_white_24.svg'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { CalendarPlanType } from '@/src/entities/calendar/model'
import { useGetCalendarPlans } from '@/src/entities/calendar/api/useGetCalendarPlans'

export default function Page() {
  const [nowDate, setNowDate] = useState(new Date())
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const { data, isLoading } = useGetCalendarPlans(nowDate.toString())
  const hashMap: PlansByDate = useMemo(() => calendarPlanToHashMap(data), [data])

  return (
    <div>
      {/*Header Line, month/week toggle, group list button*/}
      <div className='flex flex-row justify-between items-baseline w-full h-[60px]'>
        <div
          className='group/tabs relative select-none
                 [&:has(#tab-week:checked)_.slider]:translate-x-[calc(100%+12px)]
                 [&:has(#tab-week:checked)_.tab-week]:text-wooco_blue-primary
                 [&:has(#tab-month:checked)_.tab-month]:text-wooco_blue-primary'
        >
          <div className='flex flex-row gap-[12px] w-full'>
            <input
              id='tab-month'
              type='radio'
              name='view'
              defaultChecked
              className='sr-only'
            />
            <label
              htmlFor='tab-month'
              className='tab-month cursor-pointer p-[10px] text-main01 font-main01 text-gray-300 text-left'
            >
              월간
            </label>

            <input id='tab-week' type='radio' name='view' className='sr-only' />
            <label
              htmlFor='tab-week'
              className='tab-week cursor-pointer p-[10px] text-main01 font-main01 text-gray-300 text-right'
            >
              주간
            </label>
          </div>

          {/* underline track + slider */}
          <div className='relative h-[2px]'>
            <div className='slider absolute bottom-0 h-[2px] w-[49px] bg-wooco_blue-primary transition-transform duration-200' />
          </div>
        </div>
        <button className=' text-middle01 font-middle01 text-gray-700 bg-gray-200 py-2.5 px-6 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.15)] '>
          그룹 목록
        </button>
      </div>
      <div>
        {/*Calendar*/}
        <DatePicker onDateSelect={(date) => setNowDate(date)} today={nowDate} schedules={hashMap}/>

        {/*Current Day*/}
        <div className='p-2.5 h-[111px] flex flex-col items-center gap-[6px] mb-[24px]'>
          <div className='text-main01 font-main01 text-left w-[307px] p-10 text-gray-700'>
            {nowDate.getDate()}일, {weekDays[nowDate.getDay()]}요일
          </div>
          <button className='w-[307px] h-[40px] flex justify-center items-center bg-wooco_blue-primary-light rounded-full'>
            <Image src={crossIcon} alt='cross' width={16} height={16} />
          </button>
        </div>
      </div>

      {/*Plan List*/}
      <CalendarPlanList data={hashMap[dateKey(nowDate)]} />
    </div>
  )
}

function calendarPlanToHashMap(data:CalendarPlanType[] | undefined | null): PlansByDate {
  if (!data) return {}
  const record: PlansByDate = {}
  for (const plan of data) {
    const date = plan.date
    if (!record[date]) {
      record[date] = [plan]
    } else {
      record[date].push(plan)
    }
  }
  return record
}