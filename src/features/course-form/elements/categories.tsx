'use client'

import { useFormContext } from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course'
import { SelectCategories, HelperText } from '@/src/shared/ui'
import { useState } from 'react'

export function FormCategories({
  isSubmitted,
  isInCourseList,
}: {
  isSubmitted: boolean
  isInCourseList: boolean
}) {
  const { setValue, getValues } = useFormContext<CoursePayloadType>()
  const [categories, setCategories] = useState<string[]>([])

  const onChangeCategories = (categories: string[]) => {
    setCategories(categories)
    setValue('categories', categories)
  }

  return (
    <>
      <SelectCategories
        setCategories={onChangeCategories}
        prevCategories={getValues('categories')}
        isInCourseList={isInCourseList}
      />
      {isSubmitted && categories.length === 0 && (
        <HelperText message='태그를 선택해주세요.' />
      )}
    </>
  )
}
