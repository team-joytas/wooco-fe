import { SkeletonDiv } from '@/src/shared/ui'
import { SkeletonStarRateView } from './skeleton-start-view'

export function SkeletonPlaceReviewCard() {
  return (
    <div className='w-full flex items-end flex-col gap-[10px] py-[5px]'>
      <div className='w-full justify-between flex items-center'>
        <div className='flex w-fit gap-[10px] items-center'>
          <SkeletonDiv height={40} width={40} className='rounded-full' />
          <SkeletonDiv height={40} width={130} />
        </div>
      </div>

      <section className='w-full flex flex-col items-start gap-[5px]'>
        <SkeletonStarRateView size={15} />
        <SkeletonDiv height={20} className='w-full' />
      </section>

      {Array.from({ length: 3 }, (_, index) => (
        <SkeletonDiv key={index} height={11} className='w-full' />
      ))}

      <div className='h-full w-full overflow-x-auto flex items-center justify-start gap-[5px] scrollbar-hide pr-[10px]'>
        {Array.from({ length: 4 }, (_, index) => (
          <SkeletonDiv
            key={index}
            width={74}
            height={74}
            className='rounded-[5px] flex-shrink-0'
          />
        ))}
      </div>
    </div>
  )
}
