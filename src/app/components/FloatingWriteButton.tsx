'use client'

import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface FloatingWriteButtonProps {
  to: string
}

export default function FloatingWriteButton({ to }: FloatingWriteButtonProps) {
  const router = useRouter()
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    if (isClick) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isClick])

  const handleClick = (path: string) => {
    setIsClick(!isClick)
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    router.push(path)
  }

  return (
    <div className='flex items-center justify-end cursor-pointer z-[50]'>
      <div className='fixed flex flex-col gap-[28px] items-end bottom-[70px] z-[1001] pr-[20px]'>
        {isClick && (
          <div className='flex flex-col gap-[15px]'>
            <button
              className='w-[80px] h-[30px] bg-white shadow-floating-button text-[14px] rounded-full flex items-center justify-center'
              onClick={() => handleClick('/courses/new')}
            >
              코스 작성
            </button>
            <button
              className='w-[80px] h-[30px] bg-white shadow-floating-button text-[14px] rounded-full flex items-center justify-center'
              onClick={() => handleClick('/plans/new')}
            >
              플랜 작성
            </button>
          </div>
        )}
        <button
          className='w-[53px] h-[53px] bg-brand rounded-full flex items-center justify-center shadow-lg border border-blue-800 border-opacity-20'
          onClick={() => setIsClick(!isClick)}
        >
          <Pencil size={20} color='white' />
        </button>
      </div>
      {isClick && (
        <div className='fixed z-[1000] max-w-[375px] w-full h-[calc(100vh-60px)] top-0 bg-black opacity-40' />
      )}
    </div>
  )
}
