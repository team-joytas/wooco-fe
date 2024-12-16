import ProfileImage from '@/app/components/ProfileImage'
import Image from 'next/image'

interface CourseData {
  id: number
  name: string
  location: string
  categories: string[]
  image: string
  likes: number
  comments: number
  views: number
}

export default function CourseComponent({ data }: { data: CourseData }) {
  return (
    <div className='border rounded-[15px] flex flex-row'>
      <Image
        className='rounded-tl-[15px] rounded-bl-[15px]'
        width={130}
        height={130}
        src={data.image}
        alt='코스 이미지'
      />
      <div className='flex-1 flex-col px-[10px] py-[10px]'>
        <div className='ml-[5px] flex flex-row gap-[10px]'>
          {data.categories.map((category, index) => {
            return (
              <span key={index} className='py-[5px] text-[10px] border-b'>
                #{category}
              </span>
            )
          })}
        </div>
        <div className='mt-[8px] flex items-center flex-row gap-[10px]'>
          <span className='px-[10px] py-[5px] text-[10px] bg-blue-100 rounded-[15px]'>
            {data.location}
          </span>
          <p className='font-semibold text-[13px]'>{data.name}</p>
        </div>
        <div className='mt-[8px] flex gap-[5px]'>
          <ProfileImage
            src={'https://img.choroc.com/newshop/goods/009179/009179_1.jpg'}
            size={15}
          />
          <span>홍인데요</span>
        </div>
        <div className='mt-[5px] flex flex-row gap-[20px]'>
          <span className='flex flex-row gap-[5px]'>
            추천<span>{data.views}</span>
          </span>
          <span className='flex flex-row gap-[5px]'>
            댓글<span>{data.views}</span>
          </span>
          <span className='flex flex-row gap-[5px]'>
            조회
            <span>{data.views}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
