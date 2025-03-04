'use client'

import PageListComment from '@/src/views/detail-comment'
import { useGetComments } from '@/src/entities/comment/query'

export default function Page({ params }: { params: { id: string } }) {
  const { data: comments } = useGetComments(params.id)

  if (!comments) return <div>Loading...</div>

  return <PageListComment courseId={params.id} comments={comments} />
}
