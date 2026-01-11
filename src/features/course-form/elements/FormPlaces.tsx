'use client'

import { CourseInputType } from '@/src/entities/course'
import { CoursePlaceType } from '@/src/entities/place'
import { ActiveKakaoMap, HelperText } from '@/src/shared/ui'
import { DragPlace } from '@/src/widgets'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import plus from '@/src/assets/icon/medium/plus_white.svg'
import Image from 'next/image'

export function FormPlaces({
  places,
  setPlaces,
  handleClickSearchPlace,
  showValidation,
}: {
  places: CoursePlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
  handleClickSearchPlace: () => void
  showValidation: boolean
}) {
  const { register } = useFormContext<CourseInputType>()

  return (
    <div
      className='px-[20px] w-full flex flex-col gap-[15px] padding'
      {...register('places', {
        validate: (value) => value.length > 0 || '장소를 선택해주세요.',
      })}
    >
      {places.length > 0 && <ActiveKakaoMap places={places} />}
      <DragPlace places={places} setPlaces={setPlaces} />
      <button
        type='button'
        onClick={handleClickSearchPlace}
        className='w-full h-[40px] text-[15px] rounded-full flex items-center justify-center bg-wooco_blue-tertiary border-none hover:bg-container-light-blue hover:text-white transition-all duration-300'
      >
        <Image src={plus} alt='plus' className='' />
      </button>
      {showValidation && places.length === 0 && (
        <HelperText
          message='장소를 선택해주세요.'
          margin='mt-[-10px] mb-[-20px]'
        />
      )}
    </div>
  )
}
