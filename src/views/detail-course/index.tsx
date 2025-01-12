import Link from 'next/link'

import ProfileImage from '@/src/shared/ui/ProfileImage'
import Spacer from '@/src/shared/ui/Spacer'
import CardComment from '@/src/features/comment/card-comment'
import CoursePlanLayout from '@/src/widgets/CoursePlanLayout'

interface DetailCourseProps {
  courseId: number
  data: any
}

export default function DetailCourse({ courseId, data }: DetailCourseProps) {
  const dateType = data.pass_from_create.type === 'date' ? '일 전' : '시간 전'

  return (
    <CoursePlanLayout type='course' id={courseId} data={data}>
      <section className='w-full px-[20px] py-[10px] text-white bg-brand'>
        <div className='w-full flex gap-[10px] max-w-[375px]'>
          <ProfileImage src={data.user.profile_url} size={40} type='colored' />
          <div className='flex flex-col gap-[2px]'>
            <span className='font-semibold text-[14px]'>{data.user.name}</span>
            <div className='text-[13px] flex gap-[5px]'>
              <span className='text-sub font-semibold'>
                {data.pass_from_create.number}
                {dateType}
              </span>
              <span className='text-sub opacity-50'>{data.created_at}</span>
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
          <Link
            className='cursor-pointer pr-[20px] text-sub opacity-50'
            href={`/courses/${data.courseId}/comments`}
          >
            더보기
          </Link>
        </div>
        <Spacer height={20} />
        <div className='px-[30px] flex flex-col gap-[30px]'>
          {data.comments.comments.map((comment) => {
            return <CardComment key={comment.id} comment={comment} />
          })}
        </div>
      </div>
    </CoursePlanLayout>
  )
}
