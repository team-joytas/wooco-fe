import Link from 'next/link'
import Image from 'next/image'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import { Heart, MessageSquare } from 'lucide-react'
import { CourseType } from '@/src/entities/course'
import logo from '@/src/assets/images/(logo)/logo.png'

export function CourseGridCard({ course }: { course: CourseType }) {
  const handleClickLike = () => {}

  return (
    <Link
      href={`/courses/${course.id}`}
      className='w-[164px] h-[205px] flex flex-col gap-[10px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'
    >
      <section>
        <Image
          src={course.places[0].thumbnail_url || logo}
          width={207}
          height={100}
          className='h-[100px] bg-light-gray rounded-tr-[10px] rounded-tl-[10px] object-cover'
          alt='course-image'
        />
        <div className='absolute top-[80px] left-[10px] w-[27px] h-[27px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
          <ProfileImage
            size={25}
            src={course.writer.profile_url}
            user_id={course.writer.id}
          />
        </div>
      </section>

      <section className='flex flex-col justify-between h-full px-[11px] pt-[3px] pb-[8px] leading-none'>
        <div className='flex flex-col justify-start h-full gap-[5px]'>
          <span className='text-sub text-brand font-medium'>
            {course.writer.name}
          </span>
          <span className='text-sub text-black font-light'>
            {course.primary_region} / {course.secondary_region}
          </span>
          <span className='text-[13px] font-semibold w-full text-words line-clamp-2 leading-4'>
            {course.title}
          </span>
        </div>

        <div className='flex items-center justify-between gap-[4px] text-[8px] text-description'>
          <div className='flex flex-row items-center gap-[7px]'>
            <div className='flex items-center gap-[4px]'>
              <Heart
                size={12}
                className='text-brand'
                fill={course.is_liked ? '#5A59F2' : 'none'}
                strokeWidth={1.5}
                onClick={handleClickLike}
              />
              <span>{course.likes}</span>
            </div>
            <div className='flex items-center gap-[4px]'>
              <MessageSquare
                size={12}
                className='text-brand'
                strokeWidth={1.5}
              />
              <span>{course.comments}</span>
            </div>
          </div>
          <span className='text-[9px] text-black opacity-80 font-light'>
            {course.visit_date}
          </span>
        </div>
      </section>
    </Link>
  )
}
