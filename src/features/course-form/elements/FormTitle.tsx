'use client'

import { CourseInputType } from '@/src/entities/course'
import { HelperText } from '@/src/shared/ui'
import { useFormContext } from 'react-hook-form'

export function FormTitle({ showValidation }: { showValidation: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CourseInputType>()

  const validateTitle = (value: string) => {
    if (!value) return '제목을 입력해주세요.'
    if (value.length < 2 || value.length > 20) {
      return '2자 이상 20자 이하로 입력해주세요.'
    }
    return true
  }

  return (
    <>
      <input
        {...register('title', { validate: validateTitle })}
        maxLength={20}
        placeholder='코스를 한마디로 소개한다면?'
        className='rounded-full focus:outline-wooco_blue-primary-light focus:outline-[0.5px] text-main01 text-gray-800 bg-gray-100 px-[20px] scale-[0.6875] h-[54px] w-[145.45%] origin-top-left'
      />
      {showValidation && errors.title && (
        <HelperText
          message={errors.title.message || ''}
          margin='mt-[-20px] mb-[-10px]'
        />
      )}
    </>
  )
}
