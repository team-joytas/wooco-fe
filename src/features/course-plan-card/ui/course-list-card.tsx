import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import Spacer from '@/src/shared/ui/Spacer'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import type { CourseType } from '@/src/entities/course'
import Link from 'next/link'
import ProfileImage from '@/src/shared/ui/ProfileImage'

export function CourseListCard({ course }: { course: CourseType }) {
  const handleClickLike = () => {}

  return (
    <Link
      href={`/courses/${course.id}`}
      className='w-full h-[131px] py-[13px] px-[10px] gap-[5px] flex flex-col items-center rounded-[10px] bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'
    >
      <section className='flex flex-row w-full justify-between leading-4'>
        <span className='text-sub text-black font-normal'>
          {course.primary_region} / {course.secondary_region}
        </span>
        <span className='text-sub text-black opacity-80 font-light'>
          {course.visit_date}
        </span>
      </section>

      <section className='flex flex-row w-full gap-[4px]'>
        <span className='w-[138px] text-main text-black font-bold break-words line-clamp-2 mt-[6px]'>
          {course.title}
        </span>
        <div className='h-full overflow-x-auto flex flex-1 items-end justify-start gap-[5px] scrollbar-hide pr-[10px]'>
          {course.places.map((place, index) => (
            <ImageWithIndex
              key={place.id}
              src={place.thumbnail_url}
              index={index + 1}
            />
          ))}
        </div>
      </section>

      <section className='flex flex-row h-[20px] w-full justify-between items-center'>
        <div className='flex flex-row gap-[6px] items-center'>
          <ProfileImage
            size={18}
            src={course.writer.profile_url}
            user_id={course.writer.id}
          />
          <span className='text-sub text-black leading-none'>
            {course.writer.name}
          </span>
        </div>

        <div className='flex items-center gap-[9px] text-sub text-description'>
          <div className='flex items-center gap-[4px]'>
            <Heart
              size={17}
              className='text-brand'
              fill={course.is_liked ? '#5A59F2' : 'none'}
              strokeWidth={1.5}
              onClick={handleClickLike}
            />
            <span>{course.likes}</span>
          </div>
          <div className='flex items-center gap-[4px]'>
            <MessageCircle size={17} className='text-brand' strokeWidth={1.5} />
            <span>{course.comments}</span>
          </div>
          <Share2
            size={16}
            className='cursor-pointer text-brand mr-[10px]'
            strokeWidth={1.5}
            onClick={() => {}}
          />
        </div>
      </section>
    </Link>
  )
}
