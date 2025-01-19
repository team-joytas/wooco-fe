'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Spacer from '@/src/shared/ui/Spacer'
import Header from '@/src/widgets/header'
import UploadProfileImage from '@/src/features/user/upload-profile-image'
import { useForm } from 'react-hook-form'
import useUserStore from '@/src/shared/store/userStore'
import { useGetMyProfile, useUpdateUser } from '@/src/entities/user/query'

export default function UpdateUser() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [isOnBoarding, setIsOnBoarding] = useState(false)

  const updateStateUser = useUserStore((state) => state.updateStateUser)
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
      description: profile?.description || '',
      profile_url: profile?.profile_url || '',
    },
  })

  useEffect(() => {
    if (profile) {
      setImageUrl(profile.profile_url)
      setIsOnBoarding(profile.on_boarding)
      setValue('nickname', profile.name)
      setValue('description', profile.description || '')
      setValue('profile_url', profile.profile_url)
    }
  }, [setValue])

  const validateNickname = (value: string) => {
    if (!value) {
      return '닉네임을 입력해주세요.'
    }
    if (value.includes(' ')) {
      return '공백은 입력할 수 없습니다.'
    }
    if (/[`~!@#$%^&*|\\'"/?]/gi.test(value)) {
      return '특수 문자는 입력할 수 없습니다.'
    }
    if (value.length < 2 || value.length > 10) {
      return '2자 이상 10자 이하로 입력해주세요.'
    }
    return true
  }

  const validateDescription = (value: string) => {
    if (/[`~!@#$%^&*|\\'"/?]/gi.test(value)) {
      return '특수 문자는 입력할 수 없습니다.'
    }
    if (value && value.length > 50) {
      return '50자 이하로 입력해주세요.'
    }
    return true
  }

  const validateProfileUrl = (value: string) => {
    if (!value) {
      return '프로필 이미지를 선택해주세요.'
    }
    return true
  }

  const onSubmit = async (data: {
    nickname: string
    description: string
    profile_url: string
  }) => {
    updateUser(
      {
        name: data.nickname,
        description: data.description,
        profile_url: data.profile_url,
      },
      {
        onSuccess: () => {
          updateStateUser({
            name: data.nickname,
            description: data.description,
            profile_url: data.profile_url,
          })
          router.push(`/users/${profile?.user_id}`)
        },
      }
    )
  }

  const handleLogout = async () => {
    localStorage.removeItem('accessToken')
    useUserStore.getState().clearUser()
    router.push('/login')
  }

  return (
    <>
      <Header
        title={isOnBoarding ? '프로필 설정' : '프로필 수정'}
        isBack={!isOnBoarding}
      />
      <Spacer height={40} />
      <section className='w-full h-fit pb-[20px] flex flex-col items-center relative'>
        <form
          className='w-full flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <UploadProfileImage
            {...(register('profile_url'), { validate: validateProfileUrl })}
            imageUrl={imageUrl}
            setImageUrl={(url) => {
              setImageUrl(url)
              setValue('profile_url', url)
            }}
          />
          <Spacer height={22} />
          <div className='px-[20px] flex flex-col gap-[15px] items-start w-full'>
            <p className='text-main w-[80px] font-bold'>닉네임</p>
            <div className='flex px-[20px] flex-col w-full'>
              <input
                type='text'
                {...register('nickname', { validate: validateNickname })}
                className='w-full inline-block text-[13px] focus:outline-none bg-bright-gray px-[15px] py-[10px] rounded-full'
                placeholder='닉네임을 입력해주세요.'
              />
              {errors.nickname && (
                <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
                  {errors.nickname.message}
                </span>
              )}
            </div>
          </div>
          <Spacer height={15} />
          <Spacer height={8} className='bg-bright-gray' />
          <Spacer height={15} />
          <div className='px-[20px] flex flex-col gap-[15px] items-start w-full'>
            <p className='text-main w-[80px] font-bold'>소개</p>
            <div className='flex px-[20px] flex-col w-full'>
              <input
                type='text'
                {...register('description', { validate: validateDescription })}
                className='w-full inline-block text-[13px] focus:outline-none bg-bright-gray px-[15px] py-[10px] rounded-full'
                placeholder='소개를 입력해주세요.'
              />
              {errors.description && (
                <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <Spacer height={15} />
          <Spacer height={8} className='bg-bright-gray' />
          {!isOnBoarding && (
            <div className='fixed bottom-[70px] flex items-center mt-[20px] text-[10px] text-gray-500 underline gap-[10px]'>
              <button className='cursor-pointer'>회원탈퇴</button>|
              <button className='cursor-pointer' onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
          <button
            type='submit'
            className={`fixed bottom-[0px] text-[16px] font-bold flex items-center cursor-pointer justify-center w-full max-w-[375px] h-[50px] ${
              !errors.nickname
                ? 'bg-brand text-white'
                : 'bg-gray-200 text-black13'
            }`}
          >
            완료
          </button>
        </form>
      </section>
    </>
  )
}
