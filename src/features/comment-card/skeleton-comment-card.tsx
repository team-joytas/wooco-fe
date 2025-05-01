'use client'

import { SkeletonDiv } from '@/src/shared/ui'

export function SkeletonCommentCard() {
  return (
    <div className='w-full flex items-start flex-col gap-[10px] py-[5px]'>
      <div className='flex flex-row justify-center items-center gap-[10px]'>
        <SkeletonDiv height={40} width={40} className='rounded-full' />
        <SkeletonDiv height={40} width={100} />
      </div>

      <SkeletonDiv height={21} className='w-full' />
      <SkeletonDiv height={21} className='w-full' />
    </div>
  )
}
