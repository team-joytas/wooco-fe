'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import crossIcon from '@/src/assets/icon/medium/cross.svg'
import downIcon from '@/src/assets/icon/medium/down.svg'
type Props = {
  isOpen: boolean
  initialYear: number
  initialMonth: number
  onClose(): void
  onConfirm(year: number, month: number): void
  minYear?: number
  maxYear?: number
}

export default function MonthYearPicker({
                                          isOpen,
                                          initialYear,
                                          initialMonth,
                                          onClose,
                                          onConfirm,
                                          minYear = 1980,
                                          maxYear = 2099,
                                        }: Props) {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [isValidate, setIsValidate ] = useState(false)
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false)

  // Keep sync with new values
  useEffect(() => {
    if (isOpen) {
      setYear(initialYear)
      setMonth(initialMonth)
      setIsYearPickerOpen(false)
    }
  }, [isOpen, initialYear, initialMonth])

  useEffect(() => {
    if (!isOpen) return
    if (year === initialYear && month === initialMonth) {
      setIsValidate(false)
    } else {
      setIsValidate(true)
    }
  }, [year,month,isOpen])

  const years = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear]
  )

  const selectedYearBtnRef = useRef<HTMLButtonElement | null>(null)
  const yearGridRef = useRef<HTMLDivElement | null>(null)

  // When opening the year picker, center the selected year in view
  useEffect(() => {
    if (isYearPickerOpen && selectedYearBtnRef.current) {
      selectedYearBtnRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [isYearPickerOpen])

  const MonthGrid = () => (
    <div className="grid grid-cols-3 gap-[18px] mb-4">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
        <button
          key={m}
          className={`py-2 px-3 rounded hover:ring-[#A8A7FF] hover:outline-none hover:ring-2 
            ${m === month ? 'bg-[#A8A7FF] text-white' : 'text-[#616161]'}`}
          onClick={() => {
            setMonth(m)
          }}
        >
          {m}월
        </button>
      ))}
    </div>
  )

  const YearGrid = () => (
    <div className="relative">
      <div className="bg-white/90 w-full h-[236px] absolute z-[1] top-0 left-0" onClick={()=>{setIsYearPickerOpen(false)}}></div>
      <div
        ref={yearGridRef}
        className="absolute top-0 left-0 z-[2] grid grid-cols-1 gap-1.5 bg-white mb-4 w-[125px] max-h-[236px] overflow-y-auto py-1 px-2.5 shadow-[0_0_4px_rgba(0,0,0,0.25)] rounded-md"
      >
        {years.map((y) => {
          const isSelected = y === year
          return (
            <button
              key={y}
              ref={isSelected ? selectedYearBtnRef : undefined}
              className={`h-[30px] px-2.5 flex justify-start items-center rounded font-middle01 text-middle01  hover:ring-[#A8A7FF] hover:outline-none hover:ring-2
              ${isSelected ? 'bg-[#A8A7FF] text-white' : 'text-[#929292]'}`}
              onClick={() => {
                setYear(y)
                setIsYearPickerOpen(false) // go back to month grid
              }}
            >
              {y}
              { y === initialYear &&
                <div className='w-[5px] h-[5px] absolute right-5 rounded-full bg-gray-500' />
              }
            </button>
          )
        })}
      </div>
    </div>
  )
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-lg w-[344px] h-fit'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='flex justify-between items-center px-4 h-[64px] border-b border-gray-200'>
          <span className='text-headline01 font-headline01'>날짜 선택</span>
          <button onClick={onClose}>
            <Image src={crossIcon} alt='crossIcon' width={33.5} height={33.5} />
          </button>
        </div>
        <div className='px-5 relative'>
          <button
            className='text-middle01 font-middle01 text-gray-700 mt-4 mb-2.5 flex items-center justify-center gap-[10px] rounded-lg ring-gray-200 py-2.5 px-4 hover:ring-wooco_blue-primary ring-2 '
            onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
          >
            {year}
            <Image src={downIcon} alt='downIcon' width={20} height={20} />
          </button>
          {isYearPickerOpen && <YearGrid />}
          <MonthGrid />
          <button
            className={
              `w-full py-4 my-4 rounded-lg bg-wooco_blue-primary ${isValidate? "bg-wooco_blue-primary" : "bg-[#BDBDBD]"} text-white text-middle01 font-middle01`
            }
            onClick={() => {
              onConfirm(year, month)
              onClose()
            }}
            disabled={!isValidate}
          >
            {' '}
            수정 완료
          </button>
        </div>
      </div>
    </div>
  )
}
