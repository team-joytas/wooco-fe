import { SkeletonDiv } from '@/src/shared/ui'

export function SkeletonCourseGridCard() {
  return (
    <div className='w-[164px] h-[217px] flex flex-col justify-between pb-[8px] rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
      <div className='w-full flex flex-col gap-[10px]'>
        <SkeletonDiv
          width={164}
          height={100}
          className='rounded-tr-[10px] rounded-tl-[10px]'
        />

        <section className='flex flex-col gap-[7px] h-[66px] px-[11px] mt-[3px] leading-none'>
          <SkeletonDiv height={11} width={100} />

          <div className='flex flex-row items-center justify-between'>
            <SkeletonDiv height={11} width={100} />
            <SkeletonDiv height={9} width={100} />
          </div>
          <SkeletonDiv height={16} width={100} />
        </section>
      </div>

      <SkeletonDiv height={20} width={140} className='mx-[11px]' />
    </div>
  )
}
