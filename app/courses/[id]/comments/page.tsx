'use client'

import PageListComment from '@/src/views/detail-comment'
import { getComments } from '@/src/entities/comment/api'
import { useEffect, useState } from 'react'
import { CommentType } from '@/src/entities/comment/type'

export default function Page({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(params.id)
      setComments(comments)
    }
    fetchComments()
  }, [])

  return <PageListComment courseId={params.id} comments={comments} />
}
