'use client'

import { CourseInputType } from '@/src/entities/course'
import { HelperText } from '@/src/shared/ui'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

export function FormContents({ showValidation }: { showValidation: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CourseInputType>()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '148.57px' // Reset height to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px` // Set height to scrollHeight
    }
  }

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
        ref={(e) => {
          register('contents').ref(e)
          textareaRef.current = e
        }}
        className='rounded-[10px] resize-none focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-gray-100 p-[15px] text-main01 text-gray-800 scale-[0.6875] h-[148.57px] w-[145.45%] origin-top-left'
        placeholder='장소 간의 거리, 분위기, 꿀팁 등'
        maxLength={200}
        onInput={handleResize}
      />
      {showValidation && errors.contents && (
        <HelperText
          message={errors.contents.message || ''}
          margin='mt-[-50px] mb-[20px]'
        />
      )}
    </>
  )
}
