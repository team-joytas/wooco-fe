import Image from 'next/image'

interface ImageWithIndexProps {
  src: string
  index: number
}

export default function ImageWithIndex({ src, index }: ImageWithIndexProps) {
  return (
    <div className='w-[60px] h-[58px] relative  border border-container-light-blue flex items-center justify-center rounded-[5px] flex-shrink-0'>
      <Image
        alt='place'
        width={52}
        height={52}
        src={src}
        className='w-[52px] h-[52px] rounded-[5px] object-cover'
        layout='fixed'
      />
      <div className='absolute top-0 left-0 w-[13px] h-[13px] text-white bg-container-light-blue rounded-full text-[8px] flex items-center justify-center'>
        {index}
      </div>
    </div>
  )
}
