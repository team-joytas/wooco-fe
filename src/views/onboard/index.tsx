'use client'

import Image from 'next/image'
import splashLogo from '@/src/assets/images/(logo)/splash_logo.svg'
import { useEffect, useState } from 'react'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import { useGetMyProfile, useUpdateUser } from '@/src/entities/user'
import { useRouter } from 'next/navigation'
import { HelperText, Spacer } from '@/src/shared/ui'

export default function OnBoardView() {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)

  const { mutate: updateUser } = useUpdateUser()
  const { data: profile } = useGetMyProfile()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: profile?.name || '',
    },
  })

  useEffect(() => {
    if (profile) {
      setValue('nickname', profile.name)
    }
  }, [profile, setValue])

  const onSubmit = async (data: { nickname: string }) => {
    updateUser(
      { name: data.nickname, profile_url: '', description: '' },
      {
        onSuccess: () => {
          router.push(`/`)
        },
      }
    )
  }

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center
      transition-all duration-[2000ms] ease-in-out ${
        imageLoaded
          ? 'bg-brand'
          : 'bg-gradient-to-t from-brand to-container-light-blue'
      } `}
    >
      <Image
        className={`w-[450px] h-auto m-[-200px] fixed bottom-0 transition-all duration-[2000ms] ease-in-out ${
          imageLoaded
            ? 'scale-[150%] -translate-y-[50vh] opacity-10'
            : 'scale-[100%]  opacity-100'
        }  `}
        src={splashLogo}
        alt='splash'
        width={100}
        height={100}
        onLoadingComplete={() => setImageLoaded(true)}
      />

      <form
        className='w-full h-full flex flex-col items-center justify-center z-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <NicknameInput register={register} errors={errors} />
        <button
          type='submit'
          className='text-white text-[15px] w-fit font-extrabold bottom-[144px] items-center justify-center absolute left-1/2 transform -translate-x-1/2'
        >
          시작하기
        </button>
      </form>
    </div>
  )
}

interface NicknameInputProps {
  register: UseFormRegister<{ nickname: string }>
  errors: FieldErrors<{ nickname: string }>
}

function NicknameInput({ register, errors }: NicknameInputProps) {
  const validateNickname = (value: string) => {
    if (!value) return '닉네임을 입력해주세요.'
    if (value.includes(' ')) return '공백은 입력할 수 없습니다.'
    if (/[`~!@#$%^&*|\\'"/?]/gi.test(value))
      return '특수 문자는 입력할 수 없습니다.'
    if (value.length < 2 || value.length > 10)
      return '2자 이상 10자 이하로 입력해주세요.'
    return true
  }

  return (
    <div className='px-[40px] flex flex-col items-start w-full'>
      <div className='text-white w-fit flex flex-col'>
        <p className='text-headline01 font-bold'>닉네임</p>
        <p className='text-middle'>사용하실 닉네임을 작성해주세요.</p>
      </div>
      <Spacer height={23} />
      <input
        type='text'
        {...register('nickname', { validate: validateNickname })}
        className='w-full h-[40px] inline-block text-main text-gray-600 font-bold placeholder:font-normal focus:outline-none bg-gray-100 px-[15px] py-[10px] rounded-full'
        placeholder='한글, 영어, 숫자만 사용 가능'
        autoFocus
      />
      <div className='h-[16px] mt-[5px]'>
        {errors.nickname && (
          <HelperText message={errors.nickname.message || ''} />
        )}
      </div>
    </div>
  )
}
