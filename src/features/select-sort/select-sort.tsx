'use client'

import Image from 'next/image'
import down from '@/src/assets/icon/medium/down.svg'
import { useState } from 'react'
import { Option } from './option'

interface SelectSortProps {
  order: 'RECENT' | 'POPULAR'
  setOrder: (order: 'RECENT' | 'POPULAR') => void
}

export function SelectSort({ order, setOrder }: SelectSortProps) {
  const [isVisible, setIsVisible] = useState(false)
  const selectOptions = [
    { value: 'RECENT', label: '최신순' },
    { value: 'POPULAR', label: '인기순' },
  ]

  const onChange = (order: string) => {
    setOrder(order as 'RECENT' | 'POPULAR')
    setIsVisible(false)
  }

  return (
    <div className='relative'>
      <button
        className={`w-[94px] h-[29px] flex items-center justify-between rounded-[10px] bg-gray-100 px-[15px] border hover:border-brand ${
          isVisible ? 'border-brand' : 'border-gray-100'
        }`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className='text-gray-500 text-middle01'>
          {order === 'POPULAR' ? '인기순' : '최신순'}
        </span>
        <Image alt='arrow' src={down} width={13} height={8} color='gray-500' />
      </button>
      {isVisible && (
        <div className='w-[94px] h-[82px] z-[1000] absolute top-[35px] bg-white rounded-[10px] flex flex-col items-center justify-center gap-[10px] shadow-custom'>
          {selectOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              label={option.label}
              onClick={() => onChange(option.value)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
