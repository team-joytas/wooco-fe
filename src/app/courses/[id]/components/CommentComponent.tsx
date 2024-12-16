'use client'

import { useState } from 'react'
import heart_empty from '@images/heart_empty.png'
import heart_filled from '@images/heart_filled.png'
import Image from 'next/image'
import ProfileImage from '@/app/components/ProfileImage'
import { Input } from 'antd'

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
      <span className='flex justify-between items-center'>
        <p>이 코스에 대한 댓글을 남겨보세요!</p>
        <button
          onClick={handleLikeClick}
          className='flex flex-col items-center px-[5px]'
        >
          <Image
            src={isClick ? heart_filled : heart_empty}
            width={20}
            height={20}
            alt='likes'
          />
          <span className='text-[10px]'>{likeCount}</span>
        </button>
      </span>
      <div className='flex flex-col items-end'>
        <Input.TextArea
          showCount
          maxLength={100}
          allowClear
          className='mt-[15px] mb-[15px] text-[12px] py-[20px]'
          placeholder='댓글을 남겨주세요!'
          style={{ height: 80, resize: 'none' }}
        />
        <button className='mt-[15px] rounded-[5px] border-blue-100 border text-[12px] w-[80px] py-[5px]'>
          확인
        </button>
      </div>
      <div className='mt-[15px] mb-[20px] h-[2px] bg-gray-100' />
      <div className='flex flex-col gap-[20px]'>
        {data.comments.comments.map((comment) => {
          return (
            <div className='flex flex-col gap-[10px]'>
              <span className='flex gap-[10px]' key={comment.id}>
                <ProfileImage size={36} src={comment.user.profile_url} />
                <span className='flex flex-col'>
                  <p className='text-[12px]'>{comment.user.name}</p>
                  <span className='text-[10px]'>{comment.created_at}</span>
                </span>
              </span>
              <span className='text-[12px] px-[15px] py-[10px] border rounded-[10px]'>
                {comment.content}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
