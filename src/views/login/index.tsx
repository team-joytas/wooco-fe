'use client'

import Image from 'next/image'
import splashLogo from '@/src/assets/images/(logo)/splash_logo.svg'
import Spacer from '@/src/shared/ui/Spacer'
import { getLoginUrl } from '@/src/entities/login/api'
import Link from 'next/link'
import logo_long from '@/src/assets/images/(logo)/logo_long.png'
import { useRouter } from 'next/navigation'

export default function LoginView() {
  const router = useRouter()
  const handleLogin = async () => {
    const loginUrl = await getLoginUrl()
    router.push(loginUrl)
  }

  return (
    <div className='w-full h-screen bg-brand flex flex-col items-center justify-center'>
      <Image
        className='w-full h-full absolute z-9 top-[-90px] opacity-40'
        src={splashLogo}
        alt='splash'
        width={100}
        height={100}
      />
      <div className='flex flex-col items-center justify-center z-10 absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='text-white w-fit flex flex-col gap-[8px]'>
          <p className='text-[20px] font-bold'>반가워요!</p>
          <p className='text-[13px]'>일상 속의 투어 가이드, 우코입니다.</p>
        </div>
        <Spacer height={54} />
        <div className='flex flex-col items-center justify-center  gap-[10px]'>
          <button
            className='h-[32px] w-[238px] rounded-full  text-white font-extrabold cursor-pointer bg-kakao text-[15px]'
            onClick={handleLogin}
          >
            카카오로 시작하기
          </button>
          <p className='text-[13px] opacity-50 text-white'>
            간편하게 로그인하고 이용하세요
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-[49px] bottom-[50px] items-center justify-center absolute left-1/2 transform -translate-x-1/2'>
        <Link
          className='text-brand text-[15px] w-fit font-extrabold px-[15px] py-[5px] rounded-full bg-white'
          href='/'
        >
          둘러볼게요.
        </Link>
        <Image src={logo_long} alt='logo_long' width={192} height={45} />
      </div>
    </div>
  )
}
