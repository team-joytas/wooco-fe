'use client'

import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import heart_empty from '@/src/assets/icon/heart_empty_20.svg'
import setting from '@/src/assets/icon/medium/setting.svg'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
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
          <Image width={24} height={24} alt='setting' src={setting as string} />
        </Link>
      )
    } else if (isListView !== undefined && setIsListView) {
      return (
        <ViewTypeToggleButton
          isListView={isListView}
          onClick={() => setIsListView && setIsListView(!isListView)}
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
        <p className='font-bold text-[17px]'>{title}</p>
        <div className='w-[24px] h-[24px]' />
      </HeaderBase>
    )
  }

  return (
    <HeaderBase className='px-[10px] border-b-[1px] border-container-blue z-[30] sticky top-0 flex justify-between items-center w-full max-w-[375px]'>
      {isTitleTag ? (
        <>
          {isTitleCenter ? (
            <div className='relative flex items-center justify-between w-full'>
              <BackButton onClick={handleClickBack} />
              <TitleWithTagStyle title={title} isTitleCenter />
              <div className='flex items-center'>
                {showLike && (
                  <Image
                    src={
                      isLiked ? (heart_fill as string) : (heart_empty as string)
                    }
                    alt='heart'
                    className='cursor-pointer'
                    onClick={() => setIsLiked && setIsLiked(!isLiked)}
                    width={20}
                    height={20}
                  />
                )}
                {rightSection()}
              </div>
            </div>
          ) : (
            <>
              <div className='flex items-center gap-[10px]'>
                <BackButton onClick={handleClickBack} />
                <TitleWithTagStyle title={title} isTitleCenter={false} />
                {showLike && (
                  <Image
                    src={
                      isLiked ? (heart_fill as string) : (heart_empty as string)
                    }
                    alt='heart'
                    className='cursor-pointer'
                    onClick={() => setIsLiked && setIsLiked(!isLiked)}
                    width={20}
                    height={20}
                  />
                )}
              </div>
              {rightSection()}
            </>
          )}
        </>
      ) : (
        <>
          {isBack || close ? (
            <BackButton onClick={handleClickBack} />
          ) : (
            <div className='w-[24px] h-[24px]' />
          )}
          <p
            className={`font-bold ${
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
