'use client'

import { useFormContext } from 'react-hook-form'
import { DatePicker, type DatePickerProps } from 'antd'
import { HelperText } from '@/src/shared/ui'
import { useState } from 'react'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import { CourseInputType } from '@/src/entities/course'

export function FormDate({ showValidation }: { showValidation: boolean }) {
  const { register, setValue, getValues } = useFormContext<CourseInputType>()
  const [date, setDate] = useState<string | null>(
    getValues('visit_date') || null
  )

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    setValue('visit_date', dateString as string)
    setDate(dateString as string)
  }

  const minDate = undefined
  const maxDate = dayjs()

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
        prefix={
          <Calendar
            size={16}
            strokeWidth={1.5}
            className='text-brand mr-[10px]'
          />
        }
        suffixIcon={null}
        style={{
          height: '37px',
          borderRadius: '100px',
          backgroundColor: '#F5F5F5',
          padding: '0 20px',
        }}
      />
      {!date && showValidation && (
        <HelperText
          message='날짜를 선택해주세요.'
          margin='mt-[-10px] mb-[-20px]'
        />
      )}
    </>
  )
}
