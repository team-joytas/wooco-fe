'use client'

import Link from 'next/link'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import CoursePlanDetailLayout from '@/src/widgets/course-plan-detail-layout'
import { passFromCreate } from '@/src/shared/utils/date'
import { useGetCourse } from '@/src/entities/course'
import { useGetComments } from '@/src/entities/comment'
import defaultImg from '@/src/assets/images/(logo)/logo_default.png'
import ReviewCommentCard from '@/src/widgets/review-comment-card'
import { useRouter } from 'next/navigation'

interface DetailCourseProps {
  courseId: string
}

export default function DetailCourse({ courseId }: DetailCourseProps) {
  const { data: course, isError } = useGetCourse(courseId)
  const { data: comments } = useGetComments(courseId)
  const router = useRouter()
  if (isError) {
    router.push("/not-found")
  }
  if (!course) return <div>Loading...</div>

  return (
    <CoursePlanDetailLayout type='course' id={courseId} data={course}>
      <section className='w-full px-[20px] py-[10px] text-white bg-brand'>
        <div className='w-full flex gap-[10px] max-w-[375px]'>
          <ProfileImage
            src={course.writer.profile_url || '/profile.png'}
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
                {course.visit_date || ''}
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
          {comments && comments.length > 0 ? (
            <>
              {comments?.map((comment) => {
                return (
                  <ReviewCommentCard
                    key={comment.id}
                    id={comment.id}
                    content={comment}
                  />
                )
              })}
              <Link
                href={`/courses/${courseId}/comments`}
                className='cursor-pointer text-sub opacity-50 self-end'
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
