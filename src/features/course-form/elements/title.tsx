import { CoursePayloadType } from '@/src/entities/course'
import { HelperText } from '@/src/shared/ui'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

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
        placeholder='제목을 입력해주세요.'
        className='rounded-full focus:outline-container-light-blue focus:outline-[0.5px] text-sub text-gray-500 h-[35px] border-0 bg-bright-gray px-[10px]'
      />
      {errors.title && <HelperText message={errors.title.message || ''} />}
    </>
  )
}
