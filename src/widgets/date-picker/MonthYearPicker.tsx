'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

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
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false)
  const today = new Date()

  // Keep sync with new values
  useEffect(() => {
    if (isOpen) {
      setYear(initialYear)
      setMonth(initialMonth)
      setIsYearPickerOpen(false)
    }
  }, [isOpen, initialYear, initialMonth])


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
    <div className="grid grid-cols-3 gap-2 mb-4 h-48">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
        <button
          key={m}
          className={`py-2 px-3 rounded hover:ring-wooco_blue-primary hover:outline-none hover:ring-2 
            ${m === month ? 'bg-wooco_blue-primary text-white' : 'bg-gray-100'}`}
          onClick={() => {
            setMonth(m)
            onConfirm(year, m)
            onClose()
          }}
        >
          {m}월
        </button>
      ))}
    </div>
  )

  const YearGrid = () => (
    <div
      ref={yearGridRef}
      className="grid grid-cols-3 gap-2 mb-4 h-48 overflow-y-auto px-1"
    >
      {years.map((y) => {
        const isSelected = y === year
        return (
          <button
            key={y}
            ref={isSelected ? selectedYearBtnRef : undefined}
            className={`py-2 px-3 rounded hover:ring-wooco_blue-primary hover:outline-none hover:ring-2
              ${isSelected ? 'bg-wooco_blue-primary text-white' : 'bg-gray-100'}`}
            onClick={() => {
              setYear(y)
              setIsYearPickerOpen(false) // go back to month grid
            }}
          >
            {y}
          </button>
        )
      })}
    </div>
  )
  if (!isOpen) return null
  function  handleTitleClick() {
    if (isYearPickerOpen) {
      goToday()
      setIsYearPickerOpen(false)
    } else {
      setIsYearPickerOpen(true)
    }
  }
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  function goToday() {
    setYear(todayYear)
    setMonth(todayMonth)
    setIsYearPickerOpen(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-5 rounded-xl shadow-lg w-[300px]"
        onClick={(e)=>{e.stopPropagation()}}
      >
        <button
          className="text-xl font-bold mb-4 hover:text-wooco_blue-primary"
          onClick={handleTitleClick}
        >
          {year}년
        </button>

        {isYearPickerOpen ? <YearGrid /> : <MonthGrid />}
      </div>
    </div>
  )
}
