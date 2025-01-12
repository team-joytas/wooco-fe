'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/src/assets/images/(logo)/logo.png'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SearchCourse from '@/src/views/search-course'
import { Search, Bell } from 'lucide-react'

export default function DefaultHeader() {
  const path = usePathname()
  const isLogin = path?.includes('/login')
  const isNew = path?.includes('/new')
  const isComment = path?.includes('/comments')
  const isAddRegion = path?.includes('/add-region')
  const isUser = path?.includes('/users')
  const isNoti = path?.includes('/notifications')

  const [isSearch, setIsSearch] = useState(false)

  if (isLogin || isNew || isComment || isAddRegion || isNoti || isUser)
    return null

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
          <Search size={24} strokeWidth={1.5} />
        </button>
        <Link href='/notifications'>
          <Bell size={24} strokeWidth={1.5} />
        </Link>
      </div>
      {isSearch && (
        <SearchCourse isSearch={isSearch} setIsSearch={setIsSearch} />
      )}
    </header>
  )
}
