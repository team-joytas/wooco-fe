'use client'

import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course'
import { DatePicker, type DatePickerProps } from 'antd'
import { HelperText } from '@/src/shared/ui'
import { useState } from 'react'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'

export function FormDate({
  register,
  setValue,
  getValues,
  isSubmitted,
  pageType,
}: {
  register: UseFormRegister<CoursePayloadType>
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  isSubmitted: boolean
  pageType: string
}) {
  const [date, setDate] = useState<string | null>(
    getValues('visit_date') || null
  )

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    setValue('visit_date', dateString as string)
    setDate(dateString as string)
  }

  const minDate = pageType === '플랜' ? dayjs() : undefined
  const maxDate = pageType === '코스' ? dayjs() : undefined

  return (
    <>
      <DatePicker
        {...register('visit_date')}
        onChange={onChangeDate}
        allowClear
        placeholder='날짜를 선택해주세요.'
        defaultValue={date ? dayjs(date) : undefined}
        {...(minDate ? { minDate } : {})}
        {...(maxDate ? { maxDate } : {})}
        suffixIcon={
          <Calendar size={16} strokeWidth={1.5} className='text-brand' />
        }
        style={{ height: '36px', borderRadius: '100px' }}
      />
      {!date && isSubmitted && <HelperText message='날짜를 선택해주세요.' />}
    </>
  )
}
