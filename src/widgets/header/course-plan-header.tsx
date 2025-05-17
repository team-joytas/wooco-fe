'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import useUserStore from '@/src/shared/store/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { useDeletePlan } from '@/src/entities/plan'
import { BackButton, OptionDropbox, useToast } from '@/src/shared/ui'
import {
  useDeleteCourse,
  useDeleteCourseLike,
  usePostCourseLike,
} from '@/src/entities/course'
import { USER_QUERY_KEY } from '@/src/entities/user/api'
import { HeaderBase, TitleWithTagStyle } from '@/src/features'
import { useAuth } from '@/src/shared/provider'
import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import heart_empty from '@/src/assets/icon/heart_empty_20.svg'
import Image from 'next/image'

interface CoursePlanHeaderProps {
  title: string
  type: 'course' | 'plan'
  id: string
  isMine: boolean
  showLike: boolean
  isLiked: boolean
}

export function CoursePlanHeader({
  title,
  type,
  id,
  isMine,
  showLike,
  isLiked,
}: CoursePlanHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedLike, setClickedLike] = useState(isLiked)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { show } = useToast()
  const { token } = useAuth()

  const { mutate: deleteCourseLike } = useDeleteCourseLike(id)
  const { mutate: postCourseLike } = usePostCourseLike(id)
  const { mutate: deleteCourse } = useDeleteCourse()
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
    if (!token) {
      show('로그인 후 이용해주세요')
      return
    }

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
      </div>

      <TitleWithTagStyle title={title} isTitleCenter />

      <div className='flex items-center gap-[10px]'>
        {showLike && !isMine && (
          <Image
            src={clickedLike ? (heart_fill as string) : (heart_empty as string)}
            alt='heart'
            className='cursor-pointer'
            onClick={handleClickLike}
            width={20}
            height={20}
          />
        )}
        {isMine && (
          <OptionDropbox
            ref={menuRef}
            isOpen={isOpen}
            onToggle={handleClickOption}
            isMine={isMine}
            type={type}
            id={id}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </HeaderBase>
  )
}
