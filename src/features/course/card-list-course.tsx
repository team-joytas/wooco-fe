import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import logo from '@/src/assets/images/(logo)/logo.png'
import Image from 'next/image'
import type { CourseType } from '@/src/entities/course/type'
import { formatDateToYYYYMMDD } from '@/src/shared/utils/date'
import Link from 'next/link'
export default function CardListCourse({ course }: { course: CourseType }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      key={course.id}
      className='w-full flex flex-col gap-[8px] py-[15px]'
    >
      <span className='text-description text-[10px]'>
        {formatDateToYYYYMMDD(course.created_at, 'hypen')}
      </span>
      <div className='flex flex-row justify-center items-start gap-[8px]'>
        <ProfileImage
          size={32}
          src={course.writer.profile_url}
          className='border-brand'
        />
        <div className='flex flex-col w-full'>
          <span className='text-[13px] font-semibold text-brand'>
            {course.writer.name}
          </span>
          <span className='text-[16px] font-bold'>{course.title}</span>
          <span className='text-[11px]  overflow-hidden text-ellipsis break-words line-clamp-1'>
            {course.contents}
          </span>
          <Spacer height={20} />
          <div className='flex flex-row w-[300px] justify-start overflow-x-auto scrollbar-hide'>
            <span className='w-[28px] text-[10px] text-description word-break leading-[12px] flex-shrink-0'>
              추천 코스
            </span>
            <div className='flex gap-[8px] overflow-x-auto scrollbar-hide'>
              {course.places.map((place, index) => {
                return place.thumbnail_url ? (
                  <ImageWithIndex
                    key={place.id}
                    src={place.thumbnail_url}
                    index={index + 1}
                  />
                ) : (
                  <Image
                    src={logo}
                    alt='no-image'
                    key={index}
                    className='w-[58px] h-[58px] border border-container-light-blue rounded-[5px] opacity-50'
                    width={58}
                    height={58}
                  />
                )
              })}
            </div>
          </div>
          <Spacer height={20} />
          <div className='flex flex-row justify-between items-center'>
            <div className='flex items-center gap-[10px]'>
              <div className='flex items-center gap-[4px]'>
                <Heart
                  size={17}
                  className='text-brand'
                  fill={course.is_liked ? '#5A59F2' : 'none'}
                  strokeWidth={1.5}
                />
                <span>{course.likes}</span>
              </div>
              <div className='flex items-center gap-[4px]'>
                <MessageCircle
                  size={17}
                  className='text-brand'
                  strokeWidth={1.5}
                />
                <span>{course.comments}</span>
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
    </Link>
  )
}
