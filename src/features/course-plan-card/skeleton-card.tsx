import { SkeletonDiv } from '@/src/shared/ui'

export function SkeletonCoursePlanCard() {
  return (
    <div className='w-full h-[100px] py-[11px] gap-[5px] flex items-center rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
      <div className='ml-[10px] h-full w-[138px] h-fit flex flex-col gap-[4px] leading-4'>
        <SkeletonDiv height={11} />
        <SkeletonDiv height={11} />
        <SkeletonDiv height={16} />
      </div>
      <div className='h-full overflow-x-auto flex-1 items-center justify-end gap-[9px] scrollbar-hide pr-[10px]'>
        <div className='w-fit h-full flex items-center gap-[9px]'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonDiv
              key={index}
              height={52}
              width={52}
              className='rounded-[5px]'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
