import { SkeletonDiv } from '@/src/shared/ui'
import { SkeletonStarRateView } from './skeleton-start-view'

export function SkeletonReviewStats() {
  return (
    <div className='flex flex-row w-full items-center justify-between max-gap-[33px] h-[190px] px-[20px]'>
      <SkeletonDiv height={199} width={270} />
      <div className='flex flex-col items-center text-brand font-semibold'>
        <SkeletonDiv height={24} width={30} />
        <SkeletonDiv height={24} width={40} />
        <SkeletonStarRateView size={10} />
      </div>
    </div>
  )
}
