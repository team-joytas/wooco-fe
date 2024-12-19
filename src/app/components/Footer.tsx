'use client'

import Image from 'next/image'
import home from '@images/home.png'
import course from '@images/course.png'
import calendar from '@images/calendar.png'
import my from '@images/my.png'
import homePurple from '@images/home_color.png'
import coursePurple from '@images/course_color.png'
import myPurple from '@images/my_color.png'
import calendaPurple from '@images/calendar_color.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const path = usePathname()

  return (
    <footer className='fixed bottom-0 shadow-custom max-w-[375px] py-2 text-gray-400 text-base bg-white flex w-full h-50 justify-around items-center'>
      <Link href='/' className='flex flex-col items-center'>
        <Image
          src={path === '/' ? homePurple : home}
          width={25}
          height={25}
          alt='홈'
        />
        홈
      </Link>
      <Link href='/courses' className='flex flex-col items-center'>
        <Image
          src={path.includes('/courses') ? coursePurple : course}
          width={25}
          height={25}
          alt='코스'
        />
        코스
      </Link>
      <Link href='/schedules' className='flex flex-col items-center'>
        <Image
          src={path.includes('/schedules') ? calendaPurple : calendar}
          width={25}
          height={25}
          alt='일정'
        />
        일정
      </Link>
      <Link href='/users/1' className='flex flex-col items-center'>
        <Image
          src={path.includes('/users') ? myPurple : my}
          width={25}
          height={25}
          alt='마이'
        />
        마이
      </Link>
    </footer>
  )
}
