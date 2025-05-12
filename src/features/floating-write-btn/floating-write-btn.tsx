'use client'

import { Pencil, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FloatingMenuButton } from '@/src/features'

interface FloatingWriteButtonProps {
  isClick?: boolean
  setIsClick?: (value: boolean) => void
}

export function FloatingWriteButton({
  isClick: isClickProp,
  setIsClick: setIsClickProp,
}: FloatingWriteButtonProps) {
  const router = useRouter()
  const [internalIsClick, setInternalIsClick] = useState(false)

  const isClick = isClickProp ?? internalIsClick
  const setIsClick = setIsClickProp ?? setInternalIsClick

  const handleClick = (path: string) => {
    if (setIsClick) {
      setIsClick(!isClick)
    }
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    router.push(path)
  }

  return (
    <div className='flex items-center justify-end cursor-pointer z-[50]'>
      {isClick && (
        <div className='fixed w-full max-w-[390px] left-1/2 -translate-x-1/2 h-full top-0 left-0 bg-black opacity-30 z-[1000]' />
      )}
      <div className='fixed flex flex-col gap-[20px] items-end bottom-[80px] z-[1001] pr-[20px]'>
        {isClick && (
          <div className='flex flex-col gap-[10px]'>
            <FloatingMenuButton
              onClick={() => handleClick('/courses/new')}
              text='코스 작성'
            />
            <FloatingMenuButton
              onClick={() => handleClick('/plans/new')}
              text='플랜 작성'
            />
          </div>
        )}
        <button
          className='w-[50px] h-[50px] bg-brand rounded-full flex items-center justify-center shadow-lg border border-blue-800 border-opacity-20'
          onClick={() => setIsClick && setIsClick(!isClick)}
        >
          {isClick ? (
            <X size={23} color='white' strokeWidth={1.5} />
          ) : (
            <Pencil size={23} color='white' strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  )
}
