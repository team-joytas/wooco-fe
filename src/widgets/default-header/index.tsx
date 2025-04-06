'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/src/assets/images/(logo)/logo.png'
import { usePathname } from 'next/navigation'
import bell from '@/public/bell.svg'
import Spacer from '@/src/shared/ui/Spacer'

export default function DefaultHeader() {
  const path = usePathname()

  const isCoursePlanDetail =
    (path.startsWith('/courses') || path.startsWith('/plans')) &&
    !path.includes('/new') &&
    !path.includes('/by-region') &&
    !path.includes('/update') &&
    !path.includes('/comments')
  const isPlaceDetail = path.startsWith('/places') && !path.includes('/reviews')

  const isShowHeader =
    path === '/' || path === '/not-found' || isCoursePlanDetail || isPlaceDetail

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
          <Link href='/notifications' aria-label='알림'>
            <Image src={bell} alt='bell' width={22} height={22} />
          </Link>
        </div>
      </header>
      <Spacer height={55} />
    </>
  )
}
