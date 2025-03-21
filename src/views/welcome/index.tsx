'use client'

import Image from 'next/image'
import splashLogo from '@/src/assets/images/(logo)/splash_logo.svg'
import Spacer from '@/src/shared/ui/Spacer'
import Link from 'next/link'
import logo_long from '@/src/assets/images/(logo)/logo_long.png'
import loading_bar from '@/src/assets/images/loading_bar.svg'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'

export default function WelcomeView() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [transitionFinished, setTransitionFinished] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imageLoaded) return

    const transitionTimer = setTimeout(() => {
      setTransitionFinished(true)
    }, 2000)

    const afterViewTimer = setTimeout(() => {
      setLoaded(true)
    }, 3000)

    return () => {
      clearTimeout(transitionTimer)
      clearTimeout(afterViewTimer)
    }
  }, [imageLoaded])

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
        className={`w-[450px] h-auto m-[-200px] fixed z-0 bottom-0 transition-all duration-[2000ms] ease-in-out ${
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
      <div
        className={`absolute transition-opacity duration-[1000ms] ${
          transitionFinished && loaded ? 'opacity-100' : 'opacity-100'
        }`}
      >
        {loaded ? <WelcomeAfterView /> : <WelcomeBeforeView />}
      </div>
      <div className='flex flex-col gap-[49px] bottom-[50px] items-center justify-center absolute left-1/2 transform -translate-x-1/2'>
        {loaded ? (
          <Link
            className='text-white text-[15px] w-fit font-extrabold px-[15px] py-[5px]'
            href='/'
          >
            둘러볼게요
          </Link>
        ) : (
          <Image
            src={loading_bar}
            alt='loading'
            width={45}
            height={45}
            className='z-9 animate-spin'
          />
        )}
        <Image src={logo_long} alt='logo_long' width={192} height={45} />
      </div>
    </div>
  )
}

function WelcomeBeforeView() {
  return (
    <div className='w-[136px] relative text-[20px] font-bold tracking-[-0.44px] text-white text-center inline-block h-[104px]'>
      <p className='m-0'>공유하고</p>
      <p className='m-0'>공유받는</p>
      <p className='m-0'>우리들의</p>
      <p className='m-0'>코스</p>
    </div>
  )
}

function WelcomeAfterView() {
  const handleLogin = async () => {
    await signIn('kakao')
  }
  return (
    <div>
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
    </div>
  )
}
