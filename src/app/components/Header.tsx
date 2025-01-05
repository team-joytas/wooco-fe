'use client'

import noti from '@images/noti.png'
import search from '@images/search.png'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@images/logo.png'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SearchComponent from '@/app/components/(main)/SearchComponent'

export default function Header() {
  const path = usePathname()
  const isLogin = path.includes('/login')
  const [isSearch, setIsSearch] = useState(false)

  if (isLogin) return null

  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] pr-[10px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
      <Link
        href='/'
        className={`text-blue-800 text-3xl font-bold cursor-pointer pl-[10px] ${
          isSearch ? 'hidden' : ''
        }`}
      >
        <Image width={30} height={30} alt='logo' src={logo} />
      </Link>
      <div
        className={
          isSearch ? 'hidden' : 'flex items-center gap-[10px] right-[10px]'
        }
      >
        <button onClick={() => setIsSearch(!isSearch)}>
          <Image alt='search' src={search} className='w-24 h-auto' />
        </button>
        <Link href='/notifications'>
          <Image alt='notification' src={noti} className='w-24 h-auto' />
        </Link>
      </div>
      {isSearch && (
        <SearchComponent isSearch={isSearch} setIsSearch={setIsSearch} />
      )}
    </header>
  )
}
