import { SkeletonDiv } from '@/src/shared/ui/skeleton'

export function SkeletonCourseListCard() {
  return (
    <div className='w-full h-[144px] py-[13px] pl-[15px] gap-[5px] flex flex-col items-center rounded-[10px] bg-white drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'>
      <div className='w-full h-full flex flex-col justify-between'>
        <section className='flex flex-row w-full justify-between leading-4'>
          <SkeletonDiv height={11} width={100} />
          <SkeletonDiv height={11} width={100} className='mr-[15px]' />
        </section>

        <section className='flex flex-row w-full gap-[4px]'>
          <SkeletonDiv height={16} width={138} className='mt-[6px]' />
          <div className='h-full overflow-x-auto flex flex-1 items-end justify-start gap-[5px] scrollbar-hide pr-[10px]'>
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonDiv
                key={index}
                height={52}
                width={52}
                className='rounded-[5px]'
              />
            ))}
          </div>
        </section>
      </div>

      <section className='flex flex-row h-[30px] w-full justify-between items-center'>
        <div className='flex flex-row gap-[7px] items-center'>
          <SkeletonDiv height={30} width={30} className='rounded-full' />
          <SkeletonDiv height={11} width={50} />
        </div>

        <SkeletonDiv height={20} width={150} className='mr-[15px]' />
      </section>
    </div>
  )
}
