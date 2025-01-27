import { CourseType } from '@/src/entities/course/type'
import CardListCourse from '@/src/features/course/card-list-course'
import CardGridCourse from '@/src/features/course/card-grid-course'
import Spacer from '@/src/shared/ui/Spacer'
import { Fragment } from 'react'

interface CourseListLayoutProps {
  isListView: boolean
  courses: CourseType[]
}

export default function CourseListLayout({
  isListView,
  courses,
}: CourseListLayoutProps) {
  return isListView ? (
    <div className='flex flex-col justify-between items-center px-[10px]'>
      {courses.map((course: CourseType) => (
        <Fragment key={course.id}>
          <CardListCourse course={course} />
          <Spacer height={10} className='bg-bright-gray' />
        </Fragment>
      ))}
    </div>
  ) : (
    <>
      <Spacer height={15} />
      <div className='grid grid-cols-2 gap-[15px] px-[10px]'>
        {courses.map((course: CourseType) => (
          <CardGridCourse key={course.id} course={course} />
        ))}
      </div>
    </>
  )
}
