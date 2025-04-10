import { CoursePayloadType } from '@/src/entities/course'
import { HelperText } from '@/src/shared/ui'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

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
        className='rounded-[10px] h-[130px] resize-none focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-bright-gray p-[10px] text-sub text-gray-500'
        placeholder='방문 후기나 가기 전 꿀팁 등 다양한 정보가 있을수록 좋아요!'
        maxLength={200}
      />
      {errors.contents && (
        <HelperText message={errors.contents.message || ''} />
      )}
    </>
  )
}
