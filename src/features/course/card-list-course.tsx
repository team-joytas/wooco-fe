'use client'

import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { useState } from 'react'
import type { CourseType } from '@/src/entities/course/type'

export default function CardListCourse({ course }: { course: CourseType }) {
  const [isLiked, setIsLiked] = useState(course.user.is_like)

  return (
    <div key={course.id} className='w-full flex flex-col gap-[8px] p-[15px]'>
      <span className='text-description text-[10px]'>{course.created_at}</span>
      <div className='flex flex-row justify-center items-start gap-[8px]'>
        <ProfileImage
          size={32}
          src={course.user.profile_url}
          className='border-brand'
        />
        <div className='flex flex-col'>
          <span className='text-[13px] font-semibold text-brand'>
            {course.user.name}
          </span>
          <span className='text-[16px] font-bold'>{course.name}</span>
          <span className='text-[11px] h-[26px] word-wrap'>
            {course.content}
          </span>
          <Spacer height={20} />
          <div className='flex flex-row w-[300px] justify-start overflow-x-auto scrollbar-hide'>
            <span className='w-[28px] text-[10px] text-description word-break leading-[12px] flex-shrink-0'>
              추천 코스
            </span>
            {course.places.map((place) => (
              <ImageWithIndex
                key={place.id}
                src={place.image[0]}
                index={Number(place.id)}
              />
            ))}
          </div>
          <Spacer height={20} />
          <div className='flex flex-row justify-between items-center'>
            <div className='flex items-center gap-[10px]'>
              <div className='flex items-center gap-[4px]'>
                <Heart
                  size={17}
                  className='cursor-pointer text-brand'
                  fill={isLiked ? '#5A59F2' : 'none'}
                  strokeWidth={1.5}
                  onClick={() => setIsLiked(!isLiked)}
                />
                <span>25</span>
              </div>
              <div className='flex items-center gap-[4px]'>
                <MessageCircle
                  size={17}
                  className='text-brand'
                  strokeWidth={1.5}
                />
                <span>03</span>
              </div>
            </div>
            <Share2
              size={16}
              className='cursor-pointer text-brand'
              strokeWidth={1.5}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
