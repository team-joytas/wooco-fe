'use client'

import Image from 'next/image'
import course from '@/src/assets/images/course.png'
import coursePurple from '@/src/assets/images/course_color.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, SquareChartGantt, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getMyProfile } from '@/src/entities/user/api'

export default function DefaultFooter() {
  const path = usePathname()
  const router = useRouter()
  const isHome = path === '/'
  const isCourse = path?.includes('/courses')
  const isPlan = path?.includes('/plans')
  const isMy = path?.includes('/users')
  const isLogin = path?.includes('/login')
  const isComment = path?.includes('/comments')
  const isUserSetting = path?.includes('/setting')
  const isNotice = path?.includes('/notices')

  const handleClickMyPage = async () => {
    try {
      const me = await getMyProfile()
      router.push(`/users/${me.user_id}`)
    } catch {
      router.push('/login')
    }
  }

  if (isLogin || isComment || isUserSetting || isNotice) return null

  return (
    <footer className='fixed bottom-0 z-1000 shadow-custom max-w-[375px] text-gray-400 text-base bg-white flex w-full h-[60px] justify-around items-center'>
      <Link href='/' className='flex flex-col items-center mb-[5px]'>
        <Home
          size={25}
          strokeWidth={1.5}
          stroke={`${isHome ? '#5A59F2' : '#000000'}`}
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
      <Link href='/plans' className='flex flex-col items-center mb-[5px]'>
        <SquareChartGantt
          size={25}
          strokeWidth={1.5}
          stroke={`${isPlan ? '#5A59F2' : '#000000'}`}
        />
        <span className={`text-[10px] ${isPlan && 'text-brand'}`}>플랜</span>
      </Link>
      <button
        onClick={handleClickMyPage}
        className='flex flex-col items-center mb-[5px]'
      >
        <UserRound
          strokeWidth={1.5}
          size={25}
          stroke={`${isMy ? '#5A59F2' : '#000000'}`}
        />
        <span className={`text-[10px] ${isMy && 'text-brand'}`}>마이</span>
      </button>
    </footer>
  )
}
