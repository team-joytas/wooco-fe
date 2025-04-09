'use client'

import { ChevronLeft, LayoutGrid, List, Heart } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import setting from '@/src/assets/images/setting.png'
import useUserStore from '@/src/shared/store/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { useDeletePlan } from '@/src/entities/plan'
import { OptionDropbox } from '@/src/shared/ui'
import {
  useDeleteCourse,
  useDeleteCourseLike,
  usePostCourseLike,
} from '@/src/entities/course'
import { USER_QUERY_KEY } from '@/src/entities/user/api'

interface HeaderProps {
  title: string
  isBack?: boolean
  isTitleTag?: boolean
  isOnBoarding?: boolean
  isBlue?: boolean
  close?: () => void
  isListView?: boolean
  setIsListView?: (isListView: boolean) => void
  isLiked?: boolean
  setIsLiked?: (isLiked: boolean) => void
  isHeart?: boolean
}

interface OptionHeaderProps {
  title: string
  type: 'course' | 'plan'
  id: string
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
    className={`max-w-[375px] relative bg-white w-full h-[55px] min-h-[55px] flex justify-between items-center ${className}`}
  >
    {children}
  </header>
)

function TitleWithTagStyle({
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
  const queryClient = useQueryClient()

  const { mutate: deleteCourseLike } = useDeleteCourseLike(id)
  const { mutate: postCourseLike } = usePostCourseLike(id)
  const { mutate: deleteCourse } = useDeleteCourse(id)
  const { mutate: deletePlan } = useDeletePlan()

  const deleteCourseOrPlan = type === 'course' ? deleteCourse : deletePlan

  const myId = useUserStore((state) => state.user?.user_id)

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

  const handleClickBack = () => router.back()
  const handleClickOption = () => setIsOpen(!isOpen)
  const handleClickLike = async () => {
    try {
      if (isLiked) {
        setClickedLike(false)
        deleteCourseLike(id)
      } else {
        setClickedLike(true)
        postCourseLike(id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      if (myId) {
        deleteCourseOrPlan(id, {
          onSuccess: () => {
            router.push(`/${type}s`)
            queryClient.invalidateQueries({
              queryKey: USER_QUERY_KEY.courses(myId, 'RECENT'),
            })
          },
        })
      }
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
      <p className='font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue leading-normal'>
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
        <OptionDropbox
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

export function HeaderWithBackButton({ title, isTitleTag }: HeaderProps) {
  const router = useRouter()

  const handleClickBack = () => router.back()

  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] min-h-[55px] flex items-center justify-center border-b-[1px] border-b-header-line px-[12px]'>
      <ChevronLeft
        onClick={handleClickBack}
        size={24}
        color='black'
        strokeWidth={1.5}
        className='cursor-pointer absolute left-4'
      />

      {isTitleTag ? (
        <p className='border-b font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue'>
          {title}
        </p>
      ) : (
        <p className='font-semibold text-[17px] absolute left-1/2 -translate-x-1/2'>
          {title}
        </p>
      )}
    </header>
  )
}

export default function Header({
  title,
  isBack,
  isTitleTag,
  isListView,
  setIsListView,
  isOnBoarding,
  isBlue,
  close,
  isLiked,
  setIsLiked,
  isHeart,
}: HeaderProps) {
  const path = usePathname()
  const user = useUserStore((state) => state.user)
  const router = useRouter()
  const isUpdateUser = /\/users(?!.*(setting|wishlist))/.test(path)

  const notMe =
    user?.user_id !== undefined && user?.user_id !== path.split('/')[2]

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
      <HeaderBase className='px-[20px] border-b-[1px] border-container-blue'>
        <div className='w-[24px] h-[24px]' />
        <p className='font-semibold text-[17px]'>{title}</p>
        <div className='w-[24px] h-[24px]' />
      </HeaderBase>
    )
  }

  return (
    <HeaderBase className='px-[10px] border-b-[1px] border-container-blue'>
      {isTitleTag ? (
        <div className='flex items-center gap-[10px]'>
          <TitleWithTagStyle title={title} handleClickBack={handleClickBack} />
          {isHeart && (
            <Heart
              onClick={() => setIsLiked && setIsLiked(!isLiked)}
              className='cursor-pointer'
              size={20}
              strokeWidth={1.5}
              fill={isLiked ? '#5A59F2' : 'none'}
              stroke='#5A59F2'
            />
          )}
        </div>
      ) : (
        <>
          {isBack || close ? (
            <BackButton onClick={handleClickBack} />
          ) : (
            <div className='w-[24px] h-[24px]' />
          )}
          <p
            className={`font-semibold ${
              isBlue
                ? 'text-white px-[20px] text-[13px] py-[8px] rounded-[20px] bg-container-blue'
                : 'text-black text-[17px]'
            }`}
          >
            {title}
          </p>
        </>
      )}
      {isUpdateUser && !notMe ? (
        <Link href={`/users/setting`}>
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
