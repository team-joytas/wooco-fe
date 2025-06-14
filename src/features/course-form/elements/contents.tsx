'use client'

import { CoursePayloadType } from '@/src/entities/course'
import { HelperText } from '@/src/shared/ui'
import { useRef } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export function FormContents({
  register,
  errors,
}: {
  register: UseFormRegister<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
}) {
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
        className='rounded-[10px] resize-none focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-gray-100 p-[15px] text-main01 text-gray-800 scale-[0.875] h-[148.57px] w-[114.29%] origin-top-left'
        placeholder='방문 후기나 가기 전 꿀팁 등 다양한 정보가 있을수록 좋아요!'
        maxLength={200}
        onInput={handleResize}
      />
      {errors.contents && (
        <HelperText message={errors.contents.message || ''} />
      )}
    </>
  )
}
