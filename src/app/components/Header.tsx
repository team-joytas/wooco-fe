'use client'

import noti from '@images/noti.png'
import search from '@images/search.png'
import Image from 'next/image'
import Link from 'next/link'
import logo_default from '@images/logo_default.png'
import { usePathname } from 'next/navigation'

export default function Header() {
  const path = usePathname()
  const isLogin = path.includes('/login')

  if (isLogin) return null

  return (
    <>
      <header className='max-w-[375px] bg-white w-full h-[55px] min-h-[55px] flex justify-between items-center px-4 border-b-[1px] border-b-header-line'>
        <Link
          href='/'
          className='text-blue-800 text-3xl font-bold cursor-pointer'
        >
          <Image width={30} height={30} alt='logo' src={logo_default} />
        </Link>
        <div className='flex items-center gap-[10px] right-[10px]'>
          <Link href='/search'>
            <Image alt='search' src={search} className='w-24 h-auto' />
          </Link>
          <Link href='/notifications'>
            <Image alt='notification' src={noti} className='w-24 h-auto' />
          </Link>
        </div>
      </header>
    </>
  )
}
