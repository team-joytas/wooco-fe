'use client'

import { ReviewPayloadType } from '@/src/entities/place'
import Image from 'next/image'
import { useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import star from '@/src/assets/icon/star_empty_20.svg'
import starColored from '@/src/assets/icon/star_fullfill_20.svg'

interface StarRateFormProps {
  rate: number
  setValue: UseFormSetValue<ReviewPayloadType>
  register: UseFormRegister<ReviewPayloadType>
}

export const StarRateForm = ({
  rate,
  setValue,
  register,
}: StarRateFormProps) => {
  const [hover, setHover] = useState(0)
  const [rateValue, setRateValue] = useState(rate)

  const handleStarClick = (ratingValue: number) => {
    setRateValue(ratingValue)
    setValue('rating', ratingValue)
  }

  return (
    <div className='flex w-full gap-[2px] items-center justify-center'>
      <input
        hidden={true}
        value={rateValue}
        {...register('rating', {
          min: {
            value: 1,
            message: '별점은 필수 입력 항목입니다.',
          },
        })}
      />
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        const isActive = ratingValue <= (hover || rate)

        return (
          <div
            key={index}
            className='relative w-[30px] h-[30px] pointer-events-none'
          >
            <Image
              src={isActive ? starColored : star}
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
