import CardCourse from '@/src/features/course/card-course'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import { getCourses } from '@/src/entities/course/api'
import { getMockupUser } from '@/src/entities/user/api'

export default async function Page() {
  const courses = await getCourses()
  const user = await getMockupUser(1)

  const userName = user.user_info.name

  return (
    <div className='w-full pt-[20px] pb-[20px] px-[16px] flex flex-col'>
      <span className='border-b text-[18px] inline-flex items-center'>
        <p className='font-bold'>{userName}</p>
        <p>님의 코스 플랜</p>
      </span>

      {courses.map((_, index) => (
        <CardCourse key={index} />
      ))}

      <FloatingWriteButton />
    </div>
  )
}
