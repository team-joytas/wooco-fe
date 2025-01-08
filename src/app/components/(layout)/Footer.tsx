'use client'

import Image from 'next/image'
import home from '@images/home.png'
import course from '@images/course.png'
import plan from '@images/plan.png'
import planPurple from '@images/plan_color.png'
import my from '@images/my.png'
import homePurple from '@images/home_color.png'
import coursePurple from '@images/course_color.png'
import myPurple from '@images/my_color.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const path = usePathname()
  const isHome = path === '/'
  const isCourse = path.includes('/courses')
  const isPlan = path.includes('/schedules')
  const isMy = path.includes('/users')
  const isLogin = path.includes('/login')
  const isComment = path.includes('/comments')

  if (isLogin || isComment) return null

  return (
    <footer className='fixed bottom-0 z-1000 shadow-custom max-w-[375px] text-gray-400 text-base bg-white flex w-full h-[60px] justify-around items-center'>
      <Link href='/' className='flex flex-col items-center mb-[5px]'>
        <Image
          src={isHome ? homePurple : home}
          width={25}
          height={25}
          alt='홈'
        />
        <span className={`text-[10px] ${isHome && 'text-brand'}`}>홈</span>
      </Link>
      <Link href='/courses' className='flex flex-col items-center mb-[5px]'>
        <Image
          src={isCourse ? coursePurple : course}
          width={25}
          height={25}
          alt='코스'
        />
        <span className={`text-[10px] ${isCourse && 'text-brand'}`}>코스</span>
      </Link>
      <Link href='/schedules' className='flex flex-col items-center mb-[5px]'>
        <Image
          src={isPlan ? planPurple : plan}
          width={25}
          height={25}
          alt='플랜'
        />
        <span className={`text-[10px] ${isPlan && 'text-brand'}`}>플랜</span>
      </Link>
      <Link href='/users/1' className='flex flex-col items-center mb-[5px]'>
        <Image src={isMy ? myPurple : my} width={25} height={25} alt='마이' />
        <span className={`text-[10px] ${isMy && 'text-brand'}`}>마이</span>
      </Link>
    </footer>
  )
}
