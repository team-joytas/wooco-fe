import CourseComponent from './CourseComponent'

interface Course {
  id: number
  name: string
  location: string
  categories: string[]
  image: string
  likes: number
  comments: number
  views: number
}

export default function CourseListComponent({ data }: { data: Course[] }) {
  return (
    <div className='mt-[40px] flex flex-col gap-[20px]'>
      {data.map((course, index) => (
        <div key={index}>
          <CourseComponent data={course} />
          {index < data.length - 1 && (
            <div className='mt-[20px] h-[1px] bg-gray-100' />
          )}
        </div>
      ))}
    </div>
  )
}
