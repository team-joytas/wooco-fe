'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import useUserStore from '@/src/shared/store/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { useDeletePlan } from '@/src/entities/plan'
import { BackButton, OptionDropbox } from '@/src/shared/ui'
import {
  useDeleteCourse,
  useDeleteCourseLike,
  usePostCourseLike,
} from '@/src/entities/course'
import { USER_QUERY_KEY } from '@/src/entities/user/api'
import { HeaderBase } from '@/src/features'

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
