'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import useUserStore from '@/src/shared/store/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { useDeletePlan } from '@/src/entities/plan'
import { BackButton, useToast } from '@/src/shared/ui'
import {
  useDeleteCourse,
  useDeleteCourseLike,
  usePostCourseLike,
} from '@/src/entities/course'
import { USER_QUERY_KEY } from '@/src/entities/user/api'
import { HeaderBase, TitleWithTagStyle, ActionDropdown } from '@/src/features'
import { useAuth } from '@/src/shared/provider'
import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import heart_empty from '@/src/assets/icon/heart_empty_20.svg'
import Image from 'next/image'

interface CoursePlanHeaderProps {
  title: string
  type: 'course' | 'plan'
  id: string
  isMine: boolean
  isLiked: boolean
}

export function CoursePlanHeader({
  title,
  type,
  id,
  isMine,
  isLiked,
}: CoursePlanHeaderProps) {
  const [clickedLike, setClickedLike] = useState(isLiked)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { show } = useToast()
  const { token } = useAuth()

  const { mutate: deleteCourseLike } = useDeleteCourseLike(id)
  const { mutate: postCourseLike } = usePostCourseLike(id)
  const { mutate: deleteCourse } = useDeleteCourse(id)
  const { mutate: deletePlan } = useDeletePlan()

  const deleteCourseOrPlan = type === 'course' ? deleteCourse : deletePlan

  const myId = useUserStore((state) => state.user?.user_id)

  const handleClickBack = () => router.back()

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
            router.back()
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
        {isMine ? (
          <ActionDropdown type={type} id={id} handleDelete={handleDelete} />
        ) : (
          <Image
            src={clickedLike ? (heart_fill as string) : (heart_empty as string)}
            alt='heart'
            className='cursor-pointer'
            onClick={handleClickLike}
            width={20}
            height={20}
          />
        )}
      </div>
    </HeaderBase>
  )
}
