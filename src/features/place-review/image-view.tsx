import { ProfileImage } from '@/src/shared/ui'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import { X } from 'lucide-react'
import Image from 'next/image'
import left from '@/src/assets/icons/left.svg'
import right from '@/src/assets/icons/right.svg'

interface ImageViewProps {
  writer: {
    id: string
    profile_url: string
    name: string
  }
  createdAt: string
  imageUrls: string[]
  clickedIndex: number
  setClickedIndex: (index: number) => void
  setIsOpen: (isOpen: boolean) => void
}

export function ImageView({
  writer,
  createdAt,
  imageUrls,
  clickedIndex,
  setClickedIndex,
  setIsOpen,
}: ImageViewProps) {
  return (
    <div className='fixed top-0 right-0 w-full h-full z-[1000] flex flex-col items-center justify-between bg-[#4D4D4D]'>
      <header className='w-full h-[55px] flex items-center justify-end pr-[20px]'>
        <X
          size={20}
          strokeWidth={1.5}
          className='text-white cursor-pointer'
          onClick={() => setIsOpen(false)}
        />
      </header>
      <section className='relative w-full h-[calc(100vh-123px)] flex items-center justify-center'>
        <Image
          src={imageUrls[clickedIndex]}
          alt='Image'
          fill
          className='object-contain'
        />
        {clickedIndex !== 0 && (
          <Image
            src={left}
            alt='Left Arrow'
            className='absolute left-[20px] top-[50%] transform -translate-y-1/2 cursor-pointer opacity-50 hover:opacity-70'
            onClick={() => {
              const newIndex =
                clickedIndex === 0 ? imageUrls.length - 1 : clickedIndex - 1
              setIsOpen(true)
              setClickedIndex(newIndex)
            }}
          />
        )}
        {clickedIndex !== imageUrls.length - 1 && (
          <Image
            src={right}
            alt='Right Arrow'
            className='absolute right-[20px] top-[50%] transform -translate-y-1/2 cursor-pointer opacity-40 hover:opacity-70'
            onClick={() => {
              const newIndex =
                clickedIndex === imageUrls.length - 1 ? 0 : clickedIndex + 1
              setIsOpen(true)
              setClickedIndex(newIndex)
            }}
          />
        )}
      </section>
      <section className='w-full h-[68px] flex flex-col items-center justify-between'>
        <div className='w-full h-[60px] px-[20px] py-[10px] text-white bg-brand'>
          <div className='w-full flex gap-[10px] max-w-[375px] cursor-pointer'>
            <ProfileImage
              src={writer.profile_url || './profile.png'}
              size={40}
              userId={writer.id}
            />
            <div className='flex flex-col gap-[2px]'>
              <span className='font-semibold text-middle'>{writer.name}</span>
              <div className='text-sub flex gap-[5px]'>
                <span className='text-sub'>
                  {passFromCreate(createdAt || '')}
                </span>
                <span className='text-sub opacity-50'>
                  {formatDateToYYYYMMDD(createdAt, 'slash')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[8px] bg-[#4847C2]' />
      </section>
    </div>
  )
}
