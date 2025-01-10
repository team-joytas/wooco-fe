import Link from 'next/link'
import Image from 'next/image'
import ProfileImage from '../ProfileImage'
import { Heart, MessageSquare } from 'lucide-react'

// TODO: 실제 데이터로 변경
export default function LikeCourseItem() {
  return (
    <Link
      href={'/courses/1'}
      className='w-[207px] h-[230px] flex flex-col gap-[10px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'
    >
      <div>
        <Image
          src={''}
          width={207}
          height={100}
          className='bg-light-gray rounded-tr-[10px] rounded-tl-[10px]'
          alt='course-image'
        />
        <div className='absolute top-[85px] left-[10px] w-[27px] h-[27px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
          <ProfileImage
            className='w-[25px] h-[25px]'
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
          />
        </div>
      </div>
      <div className='flex mt-[5px] flex-col gap-[4px] px-[10px]'>
        <span className='text-sub font-semibold'>찰떡콩떡</span>
        <p
          className={
            'text-sub font-extrabold overflow-hidden text-ellipsis w-full text-nowrap'
          }
        >
          찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡
        </p>
        <span className='text-sub text-ellipsis w-full line-clamp-2'>
          찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡 찰떡콩떡
        </span>
      </div>
      <div className='flex items-center gap-[4px] px-[10px]'>
        <div className='flex items-center gap-[4px]'>
          <Heart fill='#5A59F2' stroke='#5A59F2' size={20} />
          <span>25</span>
        </div>
        <div className='flex items-center gap-[4px]'>
          <MessageSquare fill='#5A59F2' stroke='#5A59F2' size={20} />
          <span>03</span>
        </div>
      </div>
    </Link>
  )
}
