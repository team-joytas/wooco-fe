import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course/type'
import { DatePicker, type DatePickerProps } from 'antd'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import RegionCascader from '@/src/shared/ui/RegionCascader'
import { useState } from 'react'
export function FormTitle({
  register,
  errors,
}: {
  register: UseFormRegister<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
}) {
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
        className='rounded-full focus:outline-container-light-blue focus:outline-[0.5px] text-middle h-[35px] border-0 bg-bright-gray px-[10px]'
      />
      {errors.title && (
        <span className='text-[12px] pl-[10px] text-red-500'>
          {errors.title.message}
        </span>
      )}
    </>
  )
}

export function FormContents({
  register,
  errors,
}: {
  register: UseFormRegister<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
}) {
  const validateContents = (value: string) => {
    if (!value) return '내용을 입력해주세요.'
    if (value.length < 2 || value.length > 200) {
      return '2자 이상 200자 이하로 입력해주세요.'
    }
    return true
  }
  return (
    <>
      <textarea
        {...register('contents', { validate: validateContents })}
        className='rounded-[10px] h-[150px] focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-bright-gray p-[10px] text-middle'
        maxLength={200}
      />
      {errors.contents && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          {errors.contents.message}
        </span>
      )}
    </>
  )
}

export function FormDate({
  register,
  setValue,
  isButtonClick,
}: {
  register: UseFormRegister<CoursePayloadType>
  setValue: UseFormSetValue<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [date, setDate] = useState<string | null>(null)

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    setValue('visit_date', dateString as string)
    setDate(dateString as string)
  }

  return (
    <>
      <DatePicker
        {...register('visit_date')}
        onChange={onChangeDate}
        allowClear
        placeholder='날짜를 선택해주세요.'
      />
      {!date && isButtonClick && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          날짜를 선택해주세요.
        </span>
      )}
    </>
  )
}

export function FormCategories({
  setValue,
  isButtonClick,
}: {
  setValue: UseFormSetValue<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [categories, setCategories] = useState<string[]>([])

  const onChangeCategories = (categories: string[]) => {
    setCategories(categories)
    setValue('categories', categories)
  }

  return (
    <>
      <SelectCategories setCategories={onChangeCategories} />
      {isButtonClick && categories.length === 0 && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          태그를 선택해주세요.
        </span>
      )}
    </>
  )
}

export function FormRegion({
  setValue,
  isButtonClick,
}: {
  setValue: UseFormSetValue<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [region, setRegion] = useState<string | null>(null)
  const onChangeRegion = (value: string[]) => {
    setRegion(value[0] as string)
    setValue('primary_region', value[0] as string)
    setValue('secondary_region', value[1] as string)
  }

  return (
    <>
      <RegionCascader
        setRegion={onChangeRegion}
        placeholder='지역을 선택해주세요.'
      />
      {isButtonClick && !region && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          지역을 선택해주세요.
        </span>
      )}
    </>
  )
}
