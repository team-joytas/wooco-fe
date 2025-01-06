'use client'

import Image from 'next/image'
import write from '@images/write.png'
import { useRouter } from 'next/navigation'

interface FloatingWriteButtonProps {
  to: string
}

export default function FloatingWriteButton({ to }: FloatingWriteButtonProps) {
  const router = useRouter()

  return (
    <div className='sticky bottom-[70px] flex items-center justify-end cursor-pointer z-[50]'>
      <button
        className='w-[53px] h-[53px] bg-brand rounded-full flex items-center justify-center shadow-lg border border-blue-800 border-opacity-20'
        onClick={() => router.push(to)}
      >
        <Image alt='plus' src={write} width={20} height={20} />
      </button>
    </div>
  )
}
