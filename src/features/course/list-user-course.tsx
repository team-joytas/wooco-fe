import Spacer from '@/src/shared/ui/Spacer'
import type { CourseType } from '@/src/entities/course'
import { CoursePlanCard } from '@/src/widgets'

export default function ListUserCourse({ courses }: { courses: CourseType[] }) {
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

/*
function ArchiveListUserCourse({ courses }: { courses: CourseType[] }) {
  return (
    <>
      <section className='flex flex-col gap-[20px] px-[20px] mt-[20px]'>
        {courses.map((course) => (
          <CardCourse key={course.id} course={course} />
        ))}
      </section>
      <Spacer height={20} />
      <Spacer height={8} className='bg-bright-gray' />
      <Spacer height={10} />
      <section className='flex flex-col'>
        <div className='flex flex-col px-[20px]'>
          <p className='text-main font-semibold text-header-line'>
            공유할 플랜이 남아있어요!
          </p>
          <span className='text-sub opacity-50'>
            좋았던 플랜은 다른 사람들에게 코스로 공유해주세요
          </span>
        </div>
        <div className='flex flex-col gap-[20px] px-[20px] mt-[20px]'>
          {courses.map((course) => (
            <CardCourse key={course.id} course={course} />
          ))}
        </div>
      </section>
    </>
  )
}
  */
