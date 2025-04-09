import Link from 'next/link'
import Image from 'next/image'
import { ProfileImage } from '@/src/shared/ui'
import { CourseType } from '@/src/entities/course'
import logo from '@/src/assets/images/(logo)/logo.png'
import { CourseActionBar, useCourseLike } from '@/src/features'
import { useEffect, useState } from 'react'
import { CourseModal } from '../modal/course-modal'

export function CourseGridCard({ course }: { course: CourseType }) {
  const {
    id,
    primary_region,
    secondary_region,
    visit_date,
    title,
    places,
    writer,
    likes,
    comments,
    is_liked,
  } = course
  const { isLiked, likeCount, toggleLike } = useCourseLike(
    id.toString(),
    is_liked,
    likes
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // 모달 열릴 때 body 스크롤 방지
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <div className='w-[164px] h-[217px] flex flex-col justify-between pb-[8px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
      <Link href={`/courses/${id}`} className='w-full flex flex-col gap-[10px]'>
        <Image
          src={places[0].thumbnail_url || logo}
          width={207}
          height={100}
          className='h-[100px] bg-light-gray rounded-tr-[10px] rounded-tl-[10px] object-cover'
          alt='course-image'
        />

        <section className='absolute top-[82px] left-[10px] w-[27px] h-[27px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
          <ProfileImage size={25} src={writer.profile_url} userId={writer.id} />
        </section>

        <section className='flex flex-col gap-[7px] h-full px-[11px] mt-[3px] leading-none'>
          <span className='text-sub text-brand font-medium h-[11px]'>
            {writer.name}
          </span>
          <div className='flex flex-row items-center justify-between'>
            <span className='text-sub text-black font-light'>
              {primary_region} / {secondary_region}
            </span>

            <span className='text-[9px] text-search-gray opacity-80 font-light'>
              {visit_date}
            </span>
          </div>
          <span className='text-[13px] font-semibold w-full text-words line-clamp-2 leading-4'>
            {title}
          </span>
        </section>
      </Link>

      <CourseActionBar
        courseId={id.toString()}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={comments}
        onToggleLike={toggleLike}
        variant='grid'
        setIsModalOpen={setIsModalOpen}
      />

      <CourseModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        course={course}
      />
    </div>
  )
}
