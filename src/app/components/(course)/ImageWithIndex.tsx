import Image from 'next/image'

interface ImageWithIndexProps {
  src: string
  index: number
}

export default function ImageWithIndex({ src, index }: ImageWithIndexProps) {
  return (
    <div className='w-[60px] h-[58px] relative flex items-center justify-center  flex-shrink-0'>
      <Image
        alt='place'
        width={52}
        height={52}
        src={src}
        className='w-[52px] h-[52px] rounded-[5px] object-cover'
      />
      <div className='absolute top-0 left-0 w-[13px] h-[13px] text-white bg-container-light-blue rounded-full text-[9px] text-white flex items-center justify-center'>
        {index}
      </div>
    </div>
  )
}
