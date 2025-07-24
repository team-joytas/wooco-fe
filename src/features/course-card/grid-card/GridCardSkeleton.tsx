import { DivSkeleton } from '@/src/shared/ui'

export function GridCardSkeleton() {
  return (
    <div className='w-[164px] h-[217px] flex flex-col justify-between pb-[8px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
      <div className='w-full flex flex-col gap-[10px]'>
        <DivSkeleton
          width={164}
          height={100}
          className='rounded-tr-[10px] rounded-tl-[10px]'
        />

        <section className='flex flex-col gap-[7px] h-[66px] px-[11px] mt-[3px] leading-none'>
          <DivSkeleton height={11} width={100} />

          <div className='flex flex-row items-center justify-between'>
            <DivSkeleton height={11} width={100} />
            <DivSkeleton height={9} width={100} />
          </div>
          <DivSkeleton height={16} width={100} />
        </section>
      </div>

      <DivSkeleton height={20} width={140} className='mx-[11px]' />
    </div>
  )
}
