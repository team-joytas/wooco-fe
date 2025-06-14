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
        className='rounded-full focus:outline-wooco_blue-primary-light focus:outline-[0.5px] text-main01 text-gray-800 border-0 bg-gray-100 px-[15px] scale-[0.875] h-[40px] w-[114.29%] origin-top-left'
      />
      {errors.title && <HelperText message={errors.title.message || ''} />}
    </>
  )
}
