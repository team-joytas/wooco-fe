'use client'

import { useState } from 'react'
import { useUnlikeCourse, useLikeCourse } from '@/src/entities/course'
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

  const { mutate: unlikeCourse } = useUnlikeCourse(courseId)
  const { mutate: likeCourse } = useLikeCourse(courseId)

  const toggleLike = () => {
    if (!token) {
      show('warning', '로그인 후 이용해주세요')
      return
    }

    if (isLiked) {
      unlikeCourse(undefined, {
        onSuccess: () => setLikeCount((prev) => prev - 1),
      })
      setIsLiked(false)
    } else {
      likeCourse(undefined, {
        onSuccess: () => setLikeCount((prev) => prev + 1),
      })
      setIsLiked(true)
    }
  }

  return { isLiked, likeCount, toggleLike }
}
