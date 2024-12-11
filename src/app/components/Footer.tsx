import Image from 'next/image'
import home from '@images/home.png'
import course from '@images/course.png'
import calendar from '@images/calendar.png'
import my from '@images/my.png'
import homePurple from '@/images/home_color.png'
import coursePurple from '@images/course_color.png'
import myurple from '@images/my_color.png'
import calendarurple from '@images/calendar_color.png'

export default function Footer() {
  return (
    <footer className='shadow-custom max-w-[500px] py-2 text-gray-400 text-base bg-white flex w-full h-50 justify-around items-center'>
      <div className='flex flex-col items-center'>
        <Image src={home} width={25} height={25} alt='홈' />홈
      </div>
      <div className='flex flex-col items-center'>
        <Image src={course} width={25} height={25} alt='코스' />
        코스
      </div>
      <div className='flex flex-col items-center'>
        <Image src={calendar} width={25} height={25} alt='일정' />
        일정
      </div>
      <div className='flex flex-col items-center'>
        <Image src={my} width={25} height={25} alt='마이' />
        마이
      </div>
    </footer>
  )
}
