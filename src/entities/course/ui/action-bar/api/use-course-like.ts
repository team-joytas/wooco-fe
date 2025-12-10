'use client'

import { useState } from 'react'
import { useDeleteCourseLike, usePostCourseLike } from '@/src/entities/course'
import { useAuth, useToast } from '@/src/shared/providers'

export function useCourseLike(
  courseId: string,
  initialLiked: boolean,
  initialCount: number
) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialCount)
  const { show } = useToast()
  const { token } = useAuth()

  const { mutate: deleteCourseLike } = useDeleteCourseLike(courseId)
  const { mutate: postCourseLike } = usePostCourseLike(courseId)

  const toggleLike = () => {
    if (!token) {
      show('warning', '로그인 후 이용해주세요')
      return
    }

    if (isLiked) {
      deleteCourseLike(courseId, {
        onSuccess: () => setLikeCount((prev) => prev - 1),
      })
      setIsLiked(false)
    } else {
      postCourseLike(courseId, {
        onSuccess: () => setLikeCount((prev) => prev + 1),
      })
      setIsLiked(true)
    }
  }

  return { isLiked, likeCount, toggleLike }
}
