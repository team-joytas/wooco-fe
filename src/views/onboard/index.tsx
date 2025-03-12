'use client'

import Image from 'next/image'
import splashLogo from '@/src/assets/images/(logo)/splash_logo.svg'
import { useEffect, useState } from 'react'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import useUserStore from '@/src/shared/store/userStore'
import { useGetMyProfile, useUpdateUser } from '@/src/entities/user/query'
import { useQueryClient } from '@tanstack/react-query'
import { USER_QUERY_KEY } from '@/src/entities/user/query'
import { useRouter } from 'next/navigation'
import Spacer from '@/src/shared/ui/Spacer'

export default function OnBoardView() {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)

  const updateStateUser = useUserStore((state) => state.updateStateUser)
  const { mutate: updateUser } = useUpdateUser()
  const { data: profile } = useGetMyProfile()
  const queryClient = useQueryClient()

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
          updateStateUser({
            name: data.nickname,
            profile_url: '',
            description: '',
          })
          queryClient.refetchQueries({ queryKey: USER_QUERY_KEY.all })
          router.push(`/`)
        },
      }
    )
  }

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center
      transition-all duration-[2000ms] ease-in-out ${
        imageLoaded ? 'bg-brand' : 'bg-gradient-to-t from-brand to-[#B3BAF1]'
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
    <div className='px-[20px] flex flex-col gap-[15px] items-start w-full'>
      <div className='relative flex px-[20px] flex-col  w-full'>
        <div className='text-white w-fit flex flex-col gap-[8px]'>
          <p className='text-[20px] font-bold'>닉네임</p>
          <p className='text-[13px]'>사용하실 닉네임을 작성해주세요.</p>
        </div>
        <Spacer height={15} />
        <input
          type='text'
          {...register('nickname', { validate: validateNickname })}
          className='w-full inline-block text-[13px] focus:outline-none bg-bright-gray px-[15px] py-[10px] rounded-full'
          placeholder='한글, 영어, 숫자만 사용 가능'
          autoFocus
        />
        <div className='h-[16px] mt-[5px]'>
          {errors.nickname && (
            <span className='text-[12px] text-red-500 font-bold'>
              {errors.nickname.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
