import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import type { CourseType } from '@/src/entities/course'
import Link from 'next/link'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import { useRouter } from 'next/navigation'

export function CourseListCard({ course }: { course: CourseType }) {
  const router = useRouter()
  const handleClickLike = () => {}

  return (
    <div className='w-full h-[144px] py-[13px] pl-[15px] gap-[5px] flex flex-col items-center rounded-[10px] bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'>
      <Link
        href={`/courses/${course.id}`}
        className='w-full h-full flex flex-col justify-between'
      >
        <section className='flex flex-row w-full justify-between leading-4'>
          <span className='text-sub text-black font-normal'>
            {course.primary_region} / {course.secondary_region}
          </span>
          <span className='text-sub text-black opacity-80 font-light pr-[15px]'>
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
      </Link>

      <section className='flex flex-row h-[30px] w-full justify-between items-center'>
        <div
          className='flex flex-row gap-[7px] items-center cursor-pointer'
          onClick={() => router.push(`/users/${course.writer.id}`)}
        >
          <ProfileImage
            size={30}
            src={course.writer.profile_url}
            userId={course.writer.id}
          />
          <span className='text-sub text-brand leading-none'>
            {course.writer.name}
          </span>
        </div>

        <div className='flex items-center gap-[22px] text-sub text-description pr-[15px]'>
          <div
            className='flex items-center gap-[4px]'
            onClick={handleClickLike}
          >
            <Heart
              size={17}
              className='text-brand cursor-pointer'
              fill={course.is_liked ? '#5A59F2' : 'none'}
              strokeWidth={1.5}
            />
            <span>{course.likes}</span>
          </div>
          <div className='flex items-center gap-[4px]' onClick={() => {}}>
            <MessageCircle
              size={17}
              className='text-brand cursor-pointer'
              strokeWidth={1.5}
            />
            <span>{course.comments}</span>
          </div>
          <Share2
            size={16}
            className='cursor-pointer text-brand'
            strokeWidth={1.5}
            onClick={() => {}}
          />
        </div>
      </section>
    </div>
  )
}
