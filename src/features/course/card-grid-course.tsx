import Link from 'next/link'
import Image from 'next/image'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import { Heart, MessageSquare } from 'lucide-react'
import { CourseType } from '@/src/entities/course/type'

export default function CardGridCourse({ course }: { course: CourseType }) {
  return (
    <Link
      href={'/courses/1'}
      className='w-[164px] h-[230px] flex flex-col gap-[10px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'
    >
      <div>
        <Image
          src={course.image || ''}
          width={207}
          height={100}
          className='h-[100px] bg-light-gray rounded-tr-[10px] rounded-tl-[10px] object-cover'
          alt='course-image'
        />
        <div className='absolute top-[85px] left-[10px] w-[27px] h-[27px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
          <ProfileImage
            className='w-[25px] h-[25px]'
            src={course.user.profile_url}
          />
        </div>
      </div>
      <div className='flex mt-[5px] flex-col gap-[4px] px-[10px]'>
        <span className='text-sub font-semibold'>{course.user.name}</span>
        <p
          className={
            'text-sub font-extrabold overflow-hidden text-ellipsis w-full text-nowrap'
          }
        >
          {course.name}
        </p>
        <span className='text-sub text-ellipsis w-full line-clamp-2'>
          {course.content}
        </span>
      </div>
      <div className='flex items-center gap-[4px] px-[10px]'>
        <div className='flex items-center gap-[4px]'>
          <Heart
            {...(course.user.is_like ? { fill: '#5A59F2' } : {})}
            stroke='#5A59F2'
            size={15}
          />
          <span>{course.likes}</span>
        </div>
        <div className='flex items-center gap-[4px]'>
          <MessageSquare stroke='#5A59F2' size={15} />
          <span>{course.comments_info.summary.count}</span>
        </div>
      </div>
    </Link>
  )
}
