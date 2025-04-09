'use client'

import { ImageWithIndex, ProfileImage } from '@/src/shared/ui'
import { type CourseType } from '@/src/entities/course'
import Link from 'next/link'
import { CourseActionBar, useCourseLike } from '@/src/features'
import { CourseModal } from '../modal/course-modal'
import { useEffect, useState } from 'react'

export function CourseListCard({ course }: { course: CourseType }) {
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
    <div className='w-full h-[144px] py-[13px] pl-[15px] gap-[5px] flex flex-col items-center rounded-[10px] bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'>
      <Link
        href={`/courses/${id}`}
        className='w-full h-full flex flex-col justify-between'
      >
        <section className='flex flex-row w-full justify-between leading-4'>
          <span className='text-sub text-black font-normal'>
            {primary_region} / {secondary_region}
          </span>
          <span className='text-sub text-black opacity-80 font-light pr-[15px]'>
            {visit_date}
          </span>
        </section>

        <section className='flex flex-row w-full gap-[4px]'>
          <span className='w-[138px] text-main text-black font-bold break-words line-clamp-2 mt-[6px]'>
            {title}
          </span>
          <div className='h-full overflow-x-auto flex flex-1 items-end justify-start gap-[5px] scrollbar-hide pr-[10px]'>
            {places.map((place, index) => (
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
        <Link
          href={`/users/${writer.id}`}
          className='flex flex-row gap-[7px] items-center'
        >
          <ProfileImage size={30} src={writer.profile_url} userId={writer.id} />
          <span className='text-sub text-brand leading-none'>
            {writer.name}
          </span>
        </Link>

        <CourseActionBar
          courseId={id.toString()}
          isLiked={isLiked}
          likeCount={likeCount}
          commentCount={comments}
          onToggleLike={toggleLike}
          variant='list'
          setIsModalOpen={setIsModalOpen}
        />
      </section>

      <CourseModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        course={course}
      />
    </div>
  )
}
