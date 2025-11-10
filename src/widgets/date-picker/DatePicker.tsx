'use client'

import { useMemo, useState } from 'react'
import leftIcon from '@/src/assets/icon/medium/left.svg'
import rightIcon from '@/src/assets/icon/medium/right.svg'
import rightBlueArrowIcon from '@/src/assets/icon/medium/right-blue-arrow.svg'
import Image from 'next/image'
import MonthYearPicker from '@/src/widgets/date-picker/MonthYearPicker'
import { CalendarPlanType } from '@/src/entities/calendar/model'
const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

/** A simple schedule shape: map of 'YYYY-MM-DD' -> number of plans */
export type PlansByDate = Record<string, CalendarPlanType[]>

export interface DatePickerProps {
  today?: Date
  schedules?: PlansByDate
  /** Optional: limit how many dots to render (extra will collapse into +N) */
  maxDotsPerDay?: number
  /** Optional: when a user clicks a date */
  onDateSelect?: (date: Date) => void
}

export default function DatePicker({ today = new Date(),
                                     schedules = {},
                                     maxDotsPerDay = 3,
                                     onDateSelect,
                                   }: DatePickerProps) {
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1) // 1-based month

  const days = useMemo(() => getDatesOfMonth(year, month), [year, month])
  const firstDay = useMemo(() => new Date(year, month - 1, 1).getDay(), [year, month])

  // Handle month navigation
  const goToPrevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1)
      setMonth(12)
    } else {
      setMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1)
      setMonth(1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  // Create trailing pads so the grid is always 6 rows (42 cells total)
  const totalCells = 42
  const leadingPads = firstDay
  const trailingPads = Math.max(0, totalCells - leadingPads - days.length)

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className='max-w-sm mx-auto p-5 border rounded-xl min-h-[300px] shadow-[0_0_4px_rgba(0,0,0,0.15)] bg-white'>

      {/* Modal */}
      <MonthYearPicker isOpen={isModalOpen} initialYear={year} initialMonth={month} minYear={1980} maxYear={2099} onClose={()=>{setIsModalOpen(false)}} onConfirm={(year, month)=>{setYear(year); setMonth(month);}}/>

      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <button
          type='button'
          onClick={() => {setIsModalOpen(true)}}
          aria-label='Go to current month'
        >
          <div className='pl-1 text-center  text-headline01 text-wooco_blue-primary font-headline01 flex items-center justify-center gap-1'>
            <h1>
              {month}월 {year}
            </h1>
            <Image
              src={rightBlueArrowIcon}
              alt='arrow'
              width={6.69}
              height={11.4}
            />
          </div>
        </button>
        <div className='flex justify-around gap-5'>
          <button
            type='button'
            onClick={goToPrevMonth}
            aria-label='Previous month'
          >
            <Image alt='arrow left' src={leftIcon} width={28} />
          </button>
          <button type='button' onClick={goToNextMonth} aria-label='Next month'>
            <Image alt='arrow right' src={rightIcon} width={28} />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className='grid grid-cols-7 text-middle01 font-middle01 text-center text-gray-300 mb-2'>
        {weekdays.map((day) => (
          <div key={day} className='px-2'>
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className='grid grid-cols-7 text-[19.76px] text-gray-600'>
        {/* Padding before 1st day */}
        {Array.from({ length: leadingPads }).map((_, i) => (
          <div key={`pad-start-${i}`} />
        ))}

        {/* Actual days */}
        {days.map((date) => {
          const key = dateKey(date)
          const count = schedules[key]?.length ?? 0
          const visibleDots = Math.min(count, maxDotsPerDay)
          const extra = Math.max(0, count - visibleDots)
          const isSelected = dateKey(today) === key
          return (
            <button
              type='button'
              key={key}
              onClick={() => onDateSelect?.(date)}
              className={`rounded cursor-pointer flex flex-col items-center justify-between p-1 transition-all
                ${ isSelected
                ? 'bg-wooco_blue-primary text-white'
                : 'hover:ring-2 hover:ring-wooco_blue-primary'}
              `}
              aria-label={`${date.getMonth() + 1}/${date.getDate()} - ${count} reservations`}
            >
              <div className='h-[28px] leading-[20px]'>{date.getDate()}</div>

              {/* small circle each plan in a day */}
              <div className='flex items-center justify-center gap-[3px] h-3'>
                {Array.from({ length: visibleDots }).map((_, idx) => {
                  const plan = schedules[key]?.[idx]
                  return (
                    <span
                    key={`${key}-dot-${idx}`}
                    className='inline-block w-[6px] h-[6px] rounded-full'
                    style={{
                      backgroundColor: isSelected
                        ? `#${plan?.groupColor ?? 'D9D9D9'}`
                        : '#D9D9D9',
                    }}
                    aria-hidden='true'
                    />
                  )
                })}
                {extra > 0 && (
                  <span className='text-[10px] leading-[10px] text-gray-200'>
                    +{extra}
                  </span>
                )}
              </div>
            </button>
          )
        })}

        {/* Padding after last day to complete grid */}
        {Array.from({ length: trailingPads }).map((_, i) => (
          <div key={`pad-end-${i}`} />
        ))}
      </div>
    </div>
  )
}

/** Helpers */
function getDatesOfMonth(year: number, month: number): Date[] {
  const dates: Date[] = []
  const daysInMonth = new Date(year, month, 0).getDate() // month is 1-based
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month - 1, day)) // JS Date months are 0-based
  }
  return dates
}

export function dateKey(d: Date) {
  const y = d.getFullYear()
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${day}`
}
