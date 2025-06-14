'use client'

import { MessageCircle, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import heart_empty from '@/src/assets/icon/heart_empty_20.svg'
import React from 'react'

type Props = {
  courseId: string
  isLiked: boolean
  likeCount: number
  commentCount: number
  onToggleLike: () => void
  variant: 'list' | 'grid'
  setIsModalOpen: (isModalOpen: boolean) => void
}

export function CourseActionBar({
  courseId,
  isLiked,
  likeCount,
  commentCount,
  onToggleLike,
  variant = 'list',
  setIsModalOpen,
}: Props) {
  const router = useRouter()

  const iconSize = variant === 'list' ? 17 : 15
  const gap = variant === 'list' ? 'gap-[22px]' : 'gap-[9px]'

  return (
    <div
      className={`flex items-center text-sub text-description ${
        variant === 'list'
          ? 'pr-[15px] gap-[22px]'
          : 'px-[11px] justify-between w-full'
      }`}
    >
      <div className={`flex items-center ${gap}`}>
        <div
          className='flex items-center gap-[4px] cursor-pointer'
          onClick={onToggleLike}
        >
          <Image
            src={isLiked ? (heart_fill as string) : (heart_empty as string)}
            alt='heart'
            className='cursor-pointer'
            width={iconSize}
            height={iconSize}
          />
          {/*TODO likeCount is inline, flex padding will be changed with likeCount changing */}
          <span>{likeCount}</span>
        </div>
        <div
          className='flex items-center gap-[4px] cursor-pointer'
          onClick={() => router.push(`/courses/${courseId}/comments`)}
        >
          <MessageCircle
            size={iconSize}
            className='text-brand'
            strokeWidth={1.5}
          />
          <span>{commentCount}</span>
        </div>
      </div>

      <Share2
        size={16}
        className='cursor-pointer text-brand'
        fill='#5A59F2'
        strokeWidth={1.5}
        onClick={() => setIsModalOpen(true)}
      />
    </div>
  )
}
