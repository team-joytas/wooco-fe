'use client'

import { useFormContext } from 'react-hook-form'
import type { CourseInputType } from '@/src/entities/course'
import { HelperText, SelectCategories } from '@/src/shared/ui'

export function FormTags({ showValidation }: { showValidation: boolean }) {
  const { setValue, watch } = useFormContext<CourseInputType>()

  // TODO: categories -> tags 이름 변경 (백엔드 협의)

  const categories = watch('categories') || []

  const onChangeCategories = (selectedCategories: string[]) => {
    setValue('categories', selectedCategories, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <>
      <SelectCategories
        setCategories={onChangeCategories}
        prevCategories={categories}
      />
      {showValidation && categories.length === 0 && (
        <HelperText
          message={'1개 이상 선택해주세요.'}
          margin='mt-[-5px] mb-[-25px]'
        />
      )}

      {/* TODO: 태그 제목/입력칸 간격 조정, 태그 검색 기능, 태그 등록 기능, 페이지 이동 시 데이터 전달 어떻게 할지 */}
      {/* <div className='w-[304px] h-[36px] px-[20px] rounded-full bg-gray-100 flex flex-row items-center justify-start box-border gap-[10px] focus:outline-wooco_blue-primary-light focus:outline-[0.5px]'>
        <Search width={14} size={14} />
        <input
          className='w-[145.45%] flex-1 text-main01 text-gray-800 bg-transparent scale-[0.6875] origin-left'
          placeholder='원하는 해시태그 검색해서 등록해요!'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === 'Enter') {
              getResult(inputValue)
            }
          }}
        />
      </div> */}
    </>
  )
}
