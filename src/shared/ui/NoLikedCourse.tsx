import Link from 'next/link'

export default function NoLikedCourse() {
  return (
    <div className='w-full h-[180px] flex items-center justify-center'>
      <div className='flex flex-col shadow-lg w-[280px] h-[130px] rounded-[10px] items-center justify-center'>
        <span className='text-[14px] font-bold text-black'>
          관심있는 코스가 없어요.
        </span>
        <span className='text-[13px]  text-black'>
          인기있는 코스를 구경하고 추가해보세요!
        </span>
        <Link
          href='/courses'
          className='text-sub mt-[10px] font-semibold text-white bg-container-light-blue hover:bg-container-blue transition-all duration-300 px-[10px] py-[5px] rounded-[10px]'
        >
          코스 구경하러 가기
        </Link>
      </div>
    </div>
  )
}
