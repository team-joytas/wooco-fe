import { CourseType } from '@/src/entities/course'
import { CourseGridCard, CourseListCard } from '@/src/features'

interface CourseListLayoutProps {
  isListView: boolean
  courses: CourseType[]
}

export default function CourseListLayout({
  isListView,
  courses,
}: CourseListLayoutProps) {
  return isListView ? (
    <div className='flex flex-col w-full items-center gap-[15px]'>
      {courses.map((course: CourseType) => (
        <CourseListCard key={course.id} course={course} />
      ))}
    </div>
  ) : (
    <div className='grid grid-cols-2 gap-[15px]'>
      {courses.map((course: CourseType) => (
        <CourseGridCard key={course.id} course={course} />
      ))}
    </div>
  )
}
