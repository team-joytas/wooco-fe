'use client'

import Link from 'next/link'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import CardComment from '@/src/features/comment/card-comment'
import CoursePlanLayout from '@/src/widgets/course-plan-layout'
import type { CourseType } from '@/src/entities/course/type'
import type { CommentType } from '@/src/entities/comment/type'
import { passFromCreate } from '@/src/shared/utils/date'

interface DetailCourseProps {
  courseId: string
  course: CourseType | null
  comments: CommentType[] | null
}

export default function DetailCourse({
  courseId,
  course,
  comments,
}: DetailCourseProps) {
  return (
    <CoursePlanLayout type='course' id={courseId} data={course}>
      <section className='w-full px-[20px] py-[10px] text-white bg-brand'>
        <div className='w-full flex gap-[10px] max-w-[375px]'>
          <ProfileImage
            src={course?.writer.profile_url || ''}
            size={40}
            type='colored'
          />
          <div className='flex flex-col gap-[2px]'>
            <span className='font-semibold text-[14px]'>
              {course?.writer.name}
            </span>
            <div className='text-[13px] flex gap-[5px]'>
              <span className='text-sub font-semibold'>
                {passFromCreate(course?.created_at || '')}
              </span>
              <span className='text-sub opacity-50'>
                {course?.visit_date || ''}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Spacer height={10} className='bg-container-light-blue' />
      <Spacer height={20} />
      <div className='flex flex-col text-[15px]'>
        <div className='flex justify-between items-center'>
          <p className='px-[20px] gap-[10px] flex items-center'>
            <span className='text-main font-bold'>댓글</span>
            <span className='text-sub opacity-40'>
              코스에 대한 댓글을 남겨보세요!
            </span>
          </p>
          {comments && comments.length > 0 && (
            <Link
              className='cursor-pointer pr-[20px] text-sub opacity-50'
              href={`/courses/${courseId}/comments`}
            >
              더보기
            </Link>
          )}
        </div>
        <Spacer height={20} />
        <div className='px-[30px] flex flex-col gap-[30px] min-h-[50px]'>
          {comments && comments.length > 0 ? (
            comments?.map((comment) => {
              return <CardComment key={comment.id} comment={comment} />
            })
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
    </CoursePlanLayout>
  )
}
