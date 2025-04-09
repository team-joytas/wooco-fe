'use client'

import { ReviewPayloadType } from '@/src/entities/place'
import Image from 'next/image'
import { useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

interface StarRateFormProps {
  rate: number
  setValue: UseFormSetValue<ReviewPayloadType>
}

export const StarRateForm = ({ rate, setValue }: StarRateFormProps) => {
  const [hover, setHover] = useState(0)

  const handleStarClick = (ratingValue: number) => {
    setValue('rating', ratingValue)
  }

  return (
    <div className='flex w-full gap-[2px] items-center justify-center'>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        const isActive = ratingValue <= (hover || rate)

        return (
          <div
            key={index}
            className='relative w-[30px] h-[30px] pointer-events-none'
          >
            <Image
              src={isActive ? '/star_colored.svg' : '/star.svg'}
              alt={`Star ${ratingValue}`}
              fill
              className='cursor-pointer pointer-events-auto transition-transform'
              onClick={() => handleStarClick(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </div>
        )
      })}
    </div>
  )
}
