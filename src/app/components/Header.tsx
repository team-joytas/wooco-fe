'use client'

import noti from '@images/noti.png'
import Image from 'next/image'
import HamburgerMenu from '@components/HamburgerMenu'
import { useState } from 'react'
import Menu from './Menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className='max-w-[375px] bg-white w-full h-[50px] min-h-[50px] flex justify-between items-center px-4'>
        <p className='text-blue-800 text-3xl font-bold'>WOOCO</p>
        <div className='flex items-center right-[10px]'>
          <button>
            <Image alt='notification' src={noti} className='w-24 h-auto' />
          </button>
          <div
            className={`z-[100] ${isMenuOpen && 'fixed top-0 right-[10px]'}`}
          >
            <HamburgerMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <Menu setIsOpen={setIsMenuOpen} />
          <div
            className='fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 z-40 '
            onClick={() => setIsMenuOpen(false)}
          />
        </>
      )}
    </>
  )
}
