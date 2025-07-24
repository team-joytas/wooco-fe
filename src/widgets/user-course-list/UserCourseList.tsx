import { Spacer } from '@/src/shared/ui'
import type { CourseType } from '@/src/entities/course'
import { CoursePlanCard } from '@/src/features'

export function UserCourseList({ courses }: { courses: CourseType[] }) {
  if (courses?.length === 0) {
    return (
      <section className='relative w-full h-full flex flex-col items-center text-main font-semibold'>
        <Spacer height={143} />
        <div className='p-[10px] flex flex-col items-center text-brand justify-center gap-[5px]'>
          <p className='text-main opacity-50 font-semibold'>
            작성된 코스가 없어요!
          </p>
          <p className='text-sub opacity-50 text-black'>코스를 작성해보세요!</p>
        </div>
      </section>
    )
  }

  return (
    <section className='flex flex-col gap-[20px] px-[20px] mt-[20px]'>
      {courses?.map((course) => (
        <CoursePlanCard key={course.id} data={course} />
      ))}
    </section>
  )
}
