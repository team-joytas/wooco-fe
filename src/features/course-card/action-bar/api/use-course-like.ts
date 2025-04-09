'use client'

import { useState } from 'react'
import { useDeleteCourseLike, usePostCourseLike } from '@/src/entities/course'

export function useCourseLike(
  courseId: string,
  initialLiked: boolean,
  initialCount: number
) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(initialCount)

  const { mutate: deleteCourseLike } = useDeleteCourseLike(courseId)
  const { mutate: postCourseLike } = usePostCourseLike(courseId)

  const toggleLike = () => {
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
