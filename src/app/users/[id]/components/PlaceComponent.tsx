import { Rate } from 'antd'
import Image from 'next/image'

interface PlaceData {
  data: {
    id: number
    name: string
    star_rate: number | string
    created_at: string
    tags: string[]
    images: string[]
    content: string
  }
}

export default function PlaceComponent({ data }: PlaceData) {
  return (
    <div className='flex flex-col'>
      <span className='flex justify-between'>
        <p className='font-bold text-[18px]'>{data.name}</p>
        <span className='text-[13px]'>{data.created_at}</span>
      </span>
      <Rate
        className='mt-[10px]'
        disabled
        allowHalf
        defaultValue={Number(data.star_rate)}
      />
      <div className='flex gap-[10px] mt-[10px]'>
        {data.tags.map((tag, index) => (
          <span
            className='px-[10px] py-[3px] text-[12px] border-sky-300 rounded-[10px] border'
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className='rounded-[20px] mt-[10px] flex gap-[4px] overflow-x-hidden'>
        {data.images.map((image, index) => {
          return (
            <Image
              key={index}
              width={100}
              height={100}
              src={image}
              alt={data.name}
            />
          )
        })}
      </div>
      <span className='mt-[10px] text-[14px]'>{data.content}</span>
    </div>
  )
}
