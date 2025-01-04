import Link from 'next/link'
import Image from 'next/image'

interface NewCourseItemProps {
  data: {
    title: string
    createdAt: string
    image: string
    location: string
  }
}

// TODO: 실제 데이터로 변경
export default function NewCourseItem() {
  return (
    <Link
      href={'/'}
      className={
        'w-full h-[100px] flex items-center rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'
      }
    >
      <div className={'ml-[10px] w-[138px] h-fit flex flex-col'}>
        <span className={'text-sub text-black opacity-50'}>2024-12-24</span>
        <span className={'text-sub text-black font-semibold'}>서울 / 강남</span>
        <p className={'text-main text-black font-bold break-keep mt-[4px]'}>
          먹고 구경하고 먹고 강남 한바퀴!
        </p>
      </div>
      <div
        className={
          'flex-1  h-fit overflow-x-auto flex gap-[9px] scrollbar-hide pr-[10px]'
        }
      >
        <div className={'w-fit flex gap-[9px]'}>
          <CourseImage
            index={1}
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
          />
          <CourseImage
            index={2}
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
          />
          <CourseImage
            index={3}
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
          />
          <CourseImage
            index={4}
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
          />
        </div>
      </div>
    </Link>
  )
}

interface CourseImageProps {
  index: number
  src: string
}

function CourseImage({ index, src }: CourseImageProps) {
  return (
    <div
      className={'w-[60px] h-[58px] relative flex items-center justify-center'}
    >
      <Image
        src={src}
        alt={'먹고 구경하고 먹고 강남 한바퀴!'}
        width={52}
        height={52}
        className={'w-[52px] h-[52px] object-cover rounded-[5px] bg-light-gray'}
      />
      <span
        className={
          'absolute w-[13px] h-[13px] bg-container-light-blue top-[0px] left-[0px] flex items-center justify-center rounded-full'
        }
      >
        {index}
      </span>
    </div>
  )
}
