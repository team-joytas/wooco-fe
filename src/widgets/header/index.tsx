'use client'

import { ChevronLeft, LayoutGrid, List } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import setting from '@/src/assets/images/setting.png'
import { EllipsisVertical, Heart } from 'lucide-react'

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

  const isUpdateUser = /\/users(?!.*(setting|wishlist))/.test(path)

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

export function OptionHeader({
  title,
  type,
  id,
  isMine,
  showLike,
  isLiked,
}: {
  title: string
  type: 'course' | 'plan'
  id: number
  isMine: boolean
  showLike: boolean
  isLiked: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [clickedLike, setClickedLike] = useState(isLiked || false)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClickBack = () => {
    if (type === 'course') router.push('/courses')
    else router.push('/plans')
  }

  const handleClickOption = () => {
    setIsOpen(!isOpen)
  }

  const handleClickDelete = () => {
    setIsOpen(false)
  }

  const handleClickReport = () => {
    setIsOpen(false)
  }

  const handleClickLike = () => {
    setClickedLike(!clickedLike)
  }

  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center'>
      <div className='flex items-center gap-[10px]'>
        <button onClick={handleClickBack}>
          <ChevronLeft size={24} color='black' strokeWidth={1.5} />
        </button>
        {showLike && <div className='w-[24px] h-[24px]'></div>}
      </div>
      <p className='border-b font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue'>
        {title}
      </p>
      <div className='flex items-center gap-[10px]'>
        {showLike && (
          <button onClick={handleClickLike}>
            <Heart
              size={20}
              strokeWidth={1.5}
              fill={clickedLike ? '#5A59F2' : 'none'}
              stroke='#5A59F2'
            />
          </button>
        )}
        <div className='relative' ref={menuRef}>
          <button onClick={handleClickOption}>
            <EllipsisVertical size={24} strokeWidth={1.5} />
          </button>
          {isOpen && (
            <div className='absolute flex flex-col z-1 top-[30px] right-[10px] w-[100px] shadow-floating-button h-fit bg-light-gray rounded-[10px]'>
              {isMine ? (
                <>
                  <Link
                    className='h-[25px] text-sub flex items-center justify-center'
                    href={`/${type}s/${id}/modify`}
                  >
                    수정하기
                  </Link>
                  <button
                    className='h-[25px] text-sub flex items-center justify-center'
                    onClick={handleClickDelete}
                  >
                    삭제하기
                  </button>
                </>
              ) : (
                <button onClick={handleClickReport}>신고하기</button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
