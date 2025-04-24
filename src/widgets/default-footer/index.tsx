'use client'

import Image from 'next/image'
import course from '@/src/assets/images/course.png'
import coursePurple from '@/src/assets/images/course_color.png'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Home, SquareChartGantt, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { customAxios } from '@/src/shared/api'
import useUserStore from '@/src/shared/store/userStore'

export default function DefaultFooter() {
  const path = usePathname()
  const router = useRouter()
  const isHome = path === '/'
  const isCourse = path?.includes('/courses')
  const isPlan = path?.includes('/plans')
  const myId = useUserStore((state) => state.user?.user_id)
  const { id } = useParams()
  const isMy = path?.includes('/users') && myId === id
  const isLogin = path?.includes('/login')
  const isComment = path?.includes('/comments')
  const isUserSetting = path?.includes('/setting')
  const isNotice = path?.includes('/notices')
  const isNotification = path?.includes('/notifications')
  const isWelcome = path?.includes('welcome')
  const isOnBoard = path?.includes('onboard')
  const handleClickMyPage = async () => {
    try {
      const { data } = await customAxios.get(`/users/me`)
      if (data.results) {
        router.push(`/users/${data.results.user_id}`)
      } else {
        router.push('/login')
      }
    } catch {
      router.push('/login')
    }
  }

  if (
    isLogin ||
    isComment ||
    isUserSetting ||
    isNotice ||
    isNotification ||
    isWelcome ||
    isOnBoard
  )
    return null

  return (
    <footer className='fixed bottom-0 z-1000 shadow-custom max-w-[375px] text-black text-base bg-white flex w-full h-[60px] justify-around items-center'>
      <Link href='/' className='flex flex-col items-center'>
        <Home
          size={25}
          strokeWidth={1.5}
          stroke={`${isHome ? '#5A59F2' : '#000000'}`}
        />
        <span
          className={`text-[10px] leading-[17px] ${isHome && 'text-brand'}`}
        >
          홈
        </span>
      </Link>
      <Link href='/courses' className='flex flex-col items-center'>
        <Image
          src={isCourse ? coursePurple : course}
          width={25}
          height={25}
          alt='코스'
        />
        <span
          className={`text-[10px] leading-[17px] ${isCourse && 'text-brand'}`}
        >
          코스
        </span>
      </Link>
      <Link href='/plans' className='flex flex-col items-center'>
        <SquareChartGantt
          size={25}
          strokeWidth={1.5}
          stroke={`${isPlan ? '#5A59F2' : '#000000'}`}
        />
        <span
          className={`text-[10px] leading-[17px] ${isPlan && 'text-brand'}`}
        >
          플랜
        </span>
      </Link>
      <button
        onClick={handleClickMyPage}
        className='flex flex-col items-center'
      >
        <UserRound
          strokeWidth={1.5}
          size={25}
          stroke={`${isMy ? '#5A59F2' : '#000000'}`}
        />
        <span className={`text-[10px] leading-[17px] ${isMy && 'text-brand'}`}>
          마이
        </span>
      </button>
    </footer>
  )
}
