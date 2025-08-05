import {
  CourseType,
  ListCard,
  GridCard,
  ListCardSkeleton,
  GridCardSkeleton,
} from '@/src/entities/course'

interface CourseListLayoutProps {
  isListView: boolean
  courses?: CourseType[]
}

export default function CourseListLayout({
  isListView,
  courses,
}: CourseListLayoutProps) {
  if (courses === undefined)
    return isListView ? (
      <div className='flex flex-col w-full items-center gap-[15px]'>
        {Array.from({ length: 10 }, (_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </div>
    ) : (
      <div className='grid grid-cols-2 gap-[15px]'>
        {Array.from({ length: 10 }, (_, index) => (
          <GridCardSkeleton key={index} />
        ))}
      </div>
    )

  return isListView ? (
    <div className='flex flex-col w-full items-center gap-[15px]'>
      {courses.map((course: CourseType) => (
        <ListCard key={course.id} course={course} />
      ))}
    </div>
  ) : (
    <div className='grid grid-cols-2 gap-[15px]'>
      {courses.map((course: CourseType) => (
        <GridCard key={course.id} course={course} />
      ))}
    </div>
  )
}
