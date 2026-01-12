'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import useUserStore from '@/src/shared/store/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { BackButton } from '@/src/shared/ui'
import {
  useDeleteCourse,
  useUnlikeCourse,
  useLikeCourse,
} from '@/src/entities/course'
import { USER_QUERY_KEY } from '@/src/entities/user/api'
import { HeaderBase, TitleWithTagStyle, ActionDropdown } from '@/src/features'
import { useAuth, useToast } from '@/src/shared/providers'
import heart_fill from '@/src/assets/icon/heart_fullfill_20.svg'
import heart_empty from '@/src/assets/icon/heart_empty_20.svg'
import Image from 'next/image'

interface CourseHeaderProps {
  title: string
  id: string
  isMine: boolean
  isLiked: boolean
}

export function CourseHeader({
  title,
  id,
  isMine,
  isLiked,
}: CourseHeaderProps) {
  const [clickedLike, setClickedLike] = useState(isLiked)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { show } = useToast()
  const { token } = useAuth()

  const { mutate: unlikeCourse } = useUnlikeCourse(id)
  const { mutate: likeCourse } = useLikeCourse(id)
  const { mutate: deleteCourse } = useDeleteCourse()

  const myId = useUserStore((state) => state.user?.user_id)

  // TODO: userstore 동기화 되느지 확인

  const handleClickBack = () => router.back()

  const handleClickLike = async () => {
    if (!token) {
      show('warning', '로그인 후 이용해주세요')
      return
    }

    try {
      if (isLiked) {
        setClickedLike(false)
        unlikeCourse()
      } else {
        setClickedLike(true)
        likeCourse()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      if (myId) {
        deleteCourse(id, {
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

      <TitleWithTagStyle title={title} />

      <div className='flex items-center gap-[10px]'>
        {isMine ? (
          <ActionDropdown type='course' id={id} handleDelete={handleDelete} />
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
