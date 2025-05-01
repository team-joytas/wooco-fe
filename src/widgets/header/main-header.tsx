'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/src/assets/images/(logo)/logo.png'
import { usePathname, useRouter } from 'next/navigation'
import bell from '@/public/bell.svg'
import { Spacer, useToast } from '@/src/shared/ui'
import { useAuth } from '@/src/shared/provider'

export function MainHeader() {
  const path = usePathname()
  const router = useRouter()
  const { show } = useToast()
  const { token } = useAuth()

  const isCoursePlanDetail =
    (path.startsWith('/courses') || path.startsWith('/plans')) &&
    !path.includes('/new') &&
    !path.includes('/by-region') &&
    !path.includes('/update') &&
    !path.includes('/comments')
  const isPlaceDetail = path.startsWith('/places') && !path.includes('/reviews')

  const isShowHeader =
    path === '/' || path === '/not-found' || isCoursePlanDetail || isPlaceDetail

  const onClickBell = () => {
    if (!token) {
      show('아직 알림을 받을 수 없어요!')
      return
    }
    router.push('/notifications')
  }

  if (!isShowHeader) {
    return null
  }

  return (
    <>
      <header className='fixed top-0 z-[1000] max-w-[375px]  bg-white w-full h-[55px] pr-[10px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <Link href='/' className='text-blue-800 text-3xl font-bold pl-[10px]'>
          <Image width={30} height={30} alt='logo' src={logo} />
        </Link>

        <div className='flex items-center gap-[10px] right-[10px]'>
          <button onClick={onClickBell} aria-label='알림'>
            <Image src={bell} alt='bell' width={22} height={22} />
          </button>
        </div>
      </header>
      <Spacer height={55} />
    </>
  )
}
