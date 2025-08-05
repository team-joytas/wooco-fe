import { DivSkeleton } from '@/src/shared/ui'
import { StarRateViewSkeleton } from './StarRateViewSkeleton'

export function ReviewStatsSkeleton() {
  return (
    <div className='flex flex-row w-full items-center justify-between max-gap-[33px] h-[190px] px-[20px]'>
      <DivSkeleton height={199} width={270} />
      <div className='flex flex-col items-center text-brand font-semibold'>
        <DivSkeleton height={24} width={30} />
        <DivSkeleton height={24} width={40} />
        <StarRateViewSkeleton size={10} />
      </div>
    </div>
  )
}
