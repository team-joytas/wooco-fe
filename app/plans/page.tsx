import getData from './getData'
import CourseCard from './components/CourseCard'
import FloatingWriteButton from '@/src/widgets/FloatingWriteButton'

export default function Page() {
  const courseData = getData()
  const userName = courseData.user_name
  const planList = courseData.courses

  return (
    <div className='w-full pt-[20px] pb-[20px] px-[16px] flex flex-col'>
      <span className='border-b text-[18px] inline-flex items-center'>
        <p className='font-bold'>{userName}</p>
        <p>님의 코스 플랜</p>
      </span>

      {planList.map((course, index) => (
        <CourseCard key={index} courseData={course} />
      ))}

      <FloatingWriteButton />
    </div>
  )
}
