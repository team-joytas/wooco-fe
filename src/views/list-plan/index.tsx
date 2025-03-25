'use client'

import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import BlankTooltip from '@/src/features/plan/blank-tooltip'
import { PlanType, useGetPlans } from '@/src/entities/plan'
import { getLoginUrl } from '@/src/entities/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useGetMyProfile } from '@/src/entities/user'
import { CoursePlanCard } from '@/src/features'

export default function ListPlan() {
  const { data: plans } = useGetPlans()
  const { data: user } = useGetMyProfile()
  const [isClick, setIsClick] = useState(false)
  const router = useRouter()
  const handleLogin = async () => {
    const loginUrl = await getLoginUrl()
    router.push(loginUrl)
  }

  if (!user)
    return (
      <div className='flex flex-col items-center justify-center absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[10px] text-center p-[40px] shadow-floating-button bg-white'>
        <p className='text-middle text-description'>잠깐! 플랜을 쓰려면</p>
        <p className='text-headline text-brand'>로그인이 필요해요</p>
        <Spacer height={30} />
        <div className='flex flex-col items-center justify-center gap-[10px]'>
          <button
            className='h-[32px] w-[186px] rounded-full text-white font-extrabold cursor-pointer bg-kakao text-[15px]'
            onClick={handleLogin}
          >
            카카오로 시작하기
          </button>
          <p className='text-sub opacity-50 text-description'>
            간편하게 로그인하고 장소들을 공유해봐요
          </p>
        </div>
      </div>
    )

  return (
    <div className='w-full flex flex-col'>
      <Spacer height={20} />
      <div className='flex flex-col px-[16px]'>
        <span className='text-[14px] text-black'>
          좋아하는 장소들로 채우는 나만의 코스 계획
        </span>
        <div className='flex justify-between items-center my-[5px]'>
          <span className='inline-flex items-center'>
            <p className='font-bold text-brand text-[20px]'>{user?.name}</p>
            <p className='text-[16px]'>&nbsp; 님의 코스 플랜</p>
          </span>
          <ProfileImage size={40} src={user.profile_url} user_id={user.user_id} />
        </div>
      </div>

      <Spacer height={8} className='bg-bright-gray' />

      {plans && plans.length > 0 ? (
        <div className='flex flex-col gap-[15px] py-[20px] w-full px-[16px]'>
          {plans?.map((plan: PlanType, index: number) => (
            <CoursePlanCard key={index} data={plan} />
          ))}
        </div>
      ) : (
        <>
          <Spacer height={100} />
          <div className='text-center text-black text-[14px] font-medium'>
            아직 플랜이 없어요!
          </div>
          {!isClick && <BlankTooltip />}
        </>
      )}
      <Spacer height={20} />

      <FloatingWriteButton isClick={isClick} setIsClick={setIsClick} />
    </div>
  )
}
