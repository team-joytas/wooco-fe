'use client'

import {
  ChevronLeft,
  LayoutGrid,
  List,
  EllipsisVertical,
  Heart,
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import setting from '@/src/assets/images/setting.png'
import { deleteCourse } from '@/src/entities/course/api'

interface HeaderProps {
  title: string
  isBack?: boolean
  isTitleTag?: boolean
  isOnBoarding?: boolean
  close?: () => void
  isListView?: boolean
  setIsListView?: (isListView: boolean) => void
}

interface OptionHeaderProps {
  title: string
  type: 'course' | 'plan'
  id: number
  isMine: boolean
  showLike: boolean
  isLiked: boolean
}

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <ChevronLeft
    onClick={onClick}
    size={24}
    color='black'
    strokeWidth={1.5}
    className='cursor-pointer'
  />
)

const ViewToggleButton = ({
  isListView,
  onClick,
}: {
  isListView: boolean
  onClick: () => void
}) =>
  isListView ? (
    <LayoutGrid
      size={17}
      strokeWidth={1.5}
      onClick={onClick}
      className='cursor-pointer'
    />
  ) : (
    <List
      size={18}
      strokeWidth={1.5}
      onClick={onClick}
      className='cursor-pointer'
    />
  )

const HeaderBase = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <header
    className={`max-w-[375px] relative bg-white w-full h-[55px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line ${className}`}
  >
    {children}
  </header>
)

export function TitleWithTagStyle({
  title,
  handleClickBack,
}: {
  title: string
  handleClickBack: () => void
}) {
  return (
    <div className='flex items-center gap-[10px]'>
      <BackButton onClick={handleClickBack} />
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
}: OptionHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedLike, setClickedLike] = useState(isLiked)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClickBack = () => router.push(`/${type}s`)
  const handleClickOption = () => setIsOpen(!isOpen)
  const handleClickLike = () => setClickedLike(!clickedLike)

  const handleDelete = async () => {
    try {
      await deleteCourse(id)
      router.push(`/${type}s`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <HeaderBase className='px-[20px]'>
      <div className='flex items-center gap-[10px]'>
        <BackButton onClick={handleClickBack} />
        {showLike && !isMine && <div className='w-[24px] h-[24px]' />}
      </div>
      <p className='border-b font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue'>
        {title}
      </p>
      <div className='flex items-center gap-[10px]'>
        {showLike && !isMine && (
          <Heart
            onClick={handleClickLike}
            className='cursor-pointer'
            size={20}
            strokeWidth={1.5}
            fill={clickedLike ? '#5A59F2' : 'none'}
            stroke='#5A59F2'
          />
        )}
        <OptionMenu
          ref={menuRef}
          isOpen={isOpen}
          onToggle={handleClickOption}
          isMine={isMine}
          type={type}
          id={id}
          handleDelete={handleDelete}
        />
      </div>
    </HeaderBase>
  )
}

interface OptionMenuProps {
  isOpen: boolean
  onToggle: () => void
  isMine: boolean
  type: string
  id: number
  handleDelete: () => void
}

const OptionMenu = React.forwardRef<HTMLDivElement, OptionMenuProps>(
  ({ isOpen, onToggle, isMine, type, id, handleDelete }, ref) => (
    <div className='relative' ref={ref}>
      <EllipsisVertical
        onClick={onToggle}
        className='cursor-pointer'
        size={24}
        strokeWidth={1.5}
      />
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
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </>
          ) : (
            <button className='h-[25px] text-sub flex items-center justify-center'>
              신고하기
            </button>
          )}
        </div>
      )}
    </div>
  )
)

OptionMenu.displayName = 'OptionMenu'

export default function Header({
  title,
  isBack,
  isTitleTag,
  isListView,
  setIsListView,
  isOnBoarding,
  close,
}: HeaderProps) {
  const path = usePathname()
  const router = useRouter()
  const isUpdateUser = /\/users(?!.*(setting|wishlist))/.test(path)

  useEffect(() => {
    return () => {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleClickBack = () => {
    if (isBack) router.back()
    if (close) close()
  }

  if (isOnBoarding) {
    return (
      <HeaderBase className='px-[20px]'>
        <div className='w-[24px] h-[24px]' />
        <p className='font-semibold text-[17px]'>{title}</p>
        <div className='w-[24px] h-[24px]' />
      </HeaderBase>
    )
  }

  return (
    <HeaderBase className='px-[10px]'>
      {isTitleTag ? (
        <TitleWithTagStyle title={title} handleClickBack={handleClickBack} />
      ) : (
        <>
          {isBack || close ? (
            <BackButton onClick={handleClickBack} />
          ) : (
            <div className='w-[24px] h-[24px]' />
          )}
          <p className='font-semibold text-[17px]'>{title}</p>
        </>
      )}
      {isUpdateUser ? (
        <Link href='/users/1/setting'>
          <Image width={24} height={24} alt='setting' src={setting} />
        </Link>
      ) : (
        <div className='w-[24px] h-[24px]' />
      )}
      {isListView !== undefined && setIsListView && (
        <ViewToggleButton
          isListView={isListView}
          onClick={() => setIsListView(!isListView)}
        />
      )}
    </HeaderBase>
  )
}
