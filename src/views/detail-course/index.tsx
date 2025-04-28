'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spacer, ProfileImage } from '@/src/shared/ui'
import {
  CoursePlanDetailLayout,
  SkeletonCoursePlanDetailLayout,
} from '@/src/widgets'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import { useGetCourse } from '@/src/entities/course'
import { useGetComments } from '@/src/entities/comment'
import { CommentCard } from '@/src/features'

interface DetailCourseProps {
  courseId: string
}

export default function DetailCourse({ courseId }: DetailCourseProps) {
  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
  } = useGetCourse(courseId)
  const {
    data: comments,
    isLoading: isCommentLoading,
    refetch,
  } = useGetComments(courseId)

  const router = useRouter()

  useEffect(() => {
    // 로딩 중일때 스크롤 금지
    if (isCourseLoading || isCommentLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isCourseLoading, isCommentLoading])

  if (isError) {
    router.push('/not-found')
  }

  if (isCourseLoading || isCommentLoading || !course || !comments)
    return <SkeletonCoursePlanDetailLayout type='course' />

  return (
    <CoursePlanDetailLayout type='course' id={courseId} data={course}>
      <section className='w-full px-[20px] py-[10px] text-white bg-brand'>
        <div className='w-full flex gap-[10px] max-w-[375px] cursor-pointer'>
          <ProfileImage
            src={course.writer.profile_url || './profile.png'}
            size={40}
            userId={course.writer.id}
          />
          <div className='flex flex-col gap-[2px]'>
            <span className='font-semibold text-middle'>
              {course.writer.name}
            </span>
            <div className='text-sub flex gap-[5px]'>
              <span className='text-sub'>
                {passFromCreate(course?.created_at || '')}
              </span>
              <span className='text-sub opacity-50'>
                {formatDateToYYYYMMDD(course.created_at, 'slash')}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Spacer height={10} className='bg-container-light-blue' />
      <Spacer height={20} />
      <div className='flex flex-col text-[15px]'>
        <div className='flex px-[20px] justify-start gap-[10px] items-center'>
          <span className='text-main font-bold'>댓글</span>
          <span className='text-sub opacity-40'>
            코스에 대한 댓글을 남겨보세요!
          </span>
        </div>
        <Spacer height={20} />
        <div className='px-[20px] flex flex-col gap-[20px] min-h-[50px]'>
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => {
                return (
                  <CommentCard
                    key={comment.id}
                    id={comment.id}
                    content={comment}
                    refetch={refetch}
                  />
                )
              })}
              <Link
                href={`/courses/${courseId}/comments`}
                className='text-sub text-[#CCCCCC] self-end'
              >
                더보기
              </Link>
            </>
          ) : (
            <div className='flex flex-col gap-[10px] items-center justify-center w-full'>
              <p className='text-sub text-container-blue font-semibold'>
                댓글이 없어요 댓글을 작성해보세요!
              </p>
              <Link
                className='text-sub text-white  h-[30px] rounded-full bg-container-blue flex items-center justify-center w-full'
                href={`/courses/${courseId}/comments`}
              >
                댓글 작성하러 가기
              </Link>
            </div>
          )}
        </div>
      </div>
    </CoursePlanDetailLayout>
  )
}
