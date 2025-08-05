'use client'

import { DivSkeleton } from '@/src/shared/ui'

export function CommentCardSkeleton() {
  return (
    <div className='w-full flex items-start flex-col gap-[10px] py-[5px]'>
      <div className='flex flex-row justify-center items-center gap-[10px]'>
        <DivSkeleton height={40} width={40} className='rounded-full' />
        <DivSkeleton height={40} width={100} />
      </div>

      <DivSkeleton height={21} className='w-full' />
      <DivSkeleton height={21} className='w-full' />
    </div>
  )
}
