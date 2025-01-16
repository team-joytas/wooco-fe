'use client'

import { ChevronLeft, LayoutGrid, List } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import setting from '@/src/assets/images/setting.png'

export default function Header({
  title,
  isBack,
  isTitleTag,
  isListView,
  setIsListView,
  isOnBoarding,
  close,
}: {
  title: string
  isBack?: boolean
  isTitleTag?: boolean
  isOnBoarding?: boolean
  close?: () => void
  isListView?: boolean
  setIsListView?: (isListView: boolean) => void
}) {
  const path = usePathname()
  const router = useRouter()

  const isUpdateUser = path?.includes('/users') && !path?.includes('setting')

  useEffect(() => {
    return () => {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleClickBack = () => {
    if (isBack) {
      router.back()
    }
    if (close) {
      close()
    }
  }

  if (isOnBoarding) {
    return (
      <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <div className='w-[24px] h-[24px]'></div>
        <p className='font-semibold text-[17px]'>{title}</p>
        <div className='w-[24px] h-[24px]'></div>
      </header>
    )
  }

  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[10px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
      {isTitleTag ? (
        <TitleWithTagStyle title={title} handleClickBack={handleClickBack} />
      ) : (
        <>
          {isBack || close ? (
            <button onClick={handleClickBack}>
              <ChevronLeft size={24} color='black' strokeWidth={1.5} />
            </button>
          ) : (
            <div className='w-[24px] h-[24px]'></div>
          )}
          <p className='font-semibold text-[17px]'>{title}</p>
        </>
      )}
      {isUpdateUser ? (
        <Link href='/users/1/setting'>
          <Image width={24} height={24} alt='setting' src={setting} />
        </Link>
      ) : (
        <div className='w-[24px] h-[24px]'></div>
      )}
      {isListView !== undefined &&
        setIsListView &&
        (isListView ? (
          <LayoutGrid
            size={17}
            strokeWidth={1.5}
            onClick={() => {
              setIsListView(false)
            }}
            className='cursor-pointer'
          />
        ) : (
          <List
            size={18}
            strokeWidth={1.5}
            onClick={() => {
              setIsListView(true)
            }}
            className='cursor-pointer'
          />
        ))}
    </header>
  )
}

export function TitleWithTagStyle({
  title,
  handleClickBack,
}: {
  title: string
  handleClickBack: () => void
}) {
  return (
    <div className='flex items-center gap-[10px]'>
      <button onClick={handleClickBack}>
        <ChevronLeft size={24} color='black' strokeWidth={1.5} />
      </button>
      <div className='px-[20px] py-[5px] text-[13px] font-bold text-white bg-container-blue rounded-[20px]'>
        {title}
      </div>
    </div>
  )
}
