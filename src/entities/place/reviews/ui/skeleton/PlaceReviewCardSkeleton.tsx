import { DivSkeleton } from '@/src/shared/ui'
import { StarRateViewSkeleton } from './StarRateViewSkeleton'

export function PlaceReviewCardSkeleton() {
  return (
    <div className='w-full flex items-end flex-col gap-[10px] py-[5px]'>
      <div className='w-full justify-between flex items-center'>
        <div className='flex w-fit gap-[10px] items-center'>
          <DivSkeleton height={40} width={40} className='rounded-full' />
          <DivSkeleton height={40} width={130} />
        </div>
      </div>

      <section className='w-full flex flex-col items-start gap-[5px]'>
        <StarRateViewSkeleton size={15} />
        <DivSkeleton height={20} className='w-full' />
      </section>

      {Array.from({ length: 3 }, (_, index) => (
        <DivSkeleton key={index} height={11} className='w-full' />
      ))}

      <div className='h-full w-full overflow-x-auto flex items-center justify-start gap-[5px] scrollbar-hide pr-[10px]'>
        {Array.from({ length: 4 }, (_, index) => (
          <DivSkeleton
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
