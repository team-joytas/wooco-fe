'use client'

import { useState } from 'react'
import ProfileImage from '@/app/components/ProfileImage'
import Spacer from '@components/(layout)/Spacer'

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
  const [isClick, setIsClick] = useState(data.isLike)
  const [likeCount, setLikeCount] = useState(data.likes)

  const handleLikeClick = () => {
    setLikeCount(isClick ? likeCount - 1 : likeCount + 1)
    setIsClick(!isClick)
  }

  return (
    <div className='flex flex-col text-[15px]'>
      <p className='px-[20px] gap-[10px] flex items-center'>
        <span className='text-main font-bold'>댓글</span>
        <span className='text-sub opacity-40'>
          코스에 대한 댓글을 남겨보세요!
        </span>
      </p>
      <Spacer height={20} />
      <div className='px-[30px] flex flex-col gap-[20px]'>
        {data.comments.comments.map((comment) => {
          return (
            <div key={comment.id} className='flex flex-col gap-[10px]'>
              <span className='flex gap-[10px]'>
                <ProfileImage
                  size={40}
                  src={comment.user.profile_url}
                  type='colored'
                />
                <span className='flex flex-col'>
                  <p className='text-[12px]'>{comment.user.name}</p>
                  <span className='text-[10px]'>{comment.created_at}</span>
                </span>
              </span>
              <span className='text-[14px] px-[10px]'>{comment.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
