'use client'

import Spacer from '@components/(layout)/Spacer'
import Link from 'next/link'
import CommentItem from './CommentItem'

interface User {
  id: number
  profile_url: string
  name: string
}

interface Comments {
  summary: {
    count: number
  }
  comments: {
    id: number
    user: User
    created_at: string
    content: string
  }[]
}

interface ComponentProps {
  courseId: number
  isLike: boolean
  likes: number
  comments: Comments
}

export default function CommentComponent(data: ComponentProps) {
  return (
    <div className='flex flex-col text-[15px]'>
      <div className='flex justify-between items-center'>
        <p className='px-[20px] gap-[10px] flex items-center'>
          <span className='text-main font-bold'>댓글</span>
          <span className='text-sub opacity-40'>
            코스에 대한 댓글을 남겨보세요!
          </span>
        </p>
        <Link
          className='cursor-pointer pr-[20px] text-sub opacity-50'
          href={`/courses/${data.courseId}/comments`}
        >
          더보기
        </Link>
      </div>
      <Spacer height={20} />
      <div className='px-[30px] flex flex-col gap-[30px]'>
        {data.comments.comments.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />
        })}
      </div>
    </div>
  )
}
