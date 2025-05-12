'use client'

import { Heart } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import setting from '@/src/assets/images/setting.png'
import useUserStore from '@/src/shared/store/userStore'
import {
  HeaderBase,
  TitleWithTagStyle,
  ViewTypeToggleButton,
} from '@/src/features'
import { BackButton } from '@/src/shared/ui'

interface ActionHeaderProps {
  title: string
  isBack?: boolean
  isTitleTag?: boolean
  isTitleCenter?: boolean
  isOnBoarding?: boolean
  isBlue?: boolean
  close?: () => void
  isListView?: boolean
  setIsListView?: (isListView: boolean) => void
  isLiked?: boolean
  setIsLiked?: (isLiked: boolean) => void
  showLike?: boolean
}

export function ActionHeader({
  title,
  isBack,
  isTitleTag,
  isTitleCenter,
  isListView,
  setIsListView,
  isOnBoarding,
  isBlue,
  close,
  isLiked,
  setIsLiked,
  showLike,
}: ActionHeaderProps) {
  const path = usePathname()
  const user = useUserStore((state) => state.user)
  const router = useRouter()
  const isUpdateUser = /\/users(?!.*(setting|wishlist))/.test(path)
  const isMine = user?.user_id === path.split('/')[2]

  useEffect(() => {
    return () => {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleClickBack = () => {
    if (isBack) router.back()
    if (close) close()
  }

  const rightSection = () => {
    if (isUpdateUser && isMine) {
      return (
        <Link href={`/users/setting`}>
          <Image width={24} height={24} alt='setting' src={setting} />
        </Link>
      )
    } else if (isListView !== undefined && setIsListView) {
      return (
        <ViewTypeToggleButton
          isListView={isListView}
          onClick={() => setIsListView(!isListView)}
        />
      )
    } else {
      return <div className='w-[24px] h-[24px]' />
    }
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
    <HeaderBase className='px-[10px] border-b-[1px] border-container-blue z-[30] sticky top-0'>
      {isTitleTag ? (
        <div
          className={`flex items-center ${
            isTitleCenter ? 'w-full relative justify-between' : 'gap-[10px] justify-center'
          }`}
        >
          <BackButton onClick={handleClickBack} />
          <TitleWithTagStyle title={title} isTitleCenter={!!isTitleCenter} />
          {showLike && (
            <Heart
              onClick={() => setIsLiked && setIsLiked(!isLiked)}
              className='cursor-pointer'
              size={20}
              strokeWidth={1.5}
              fill={isLiked ? '#5A59F2' : 'none'}
              stroke='#5A59F2'
            />
          )}
          {rightSection()}
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
          {rightSection()}
        </>
      )}
    </HeaderBase>
  )
}
