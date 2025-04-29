import { SkeletonDiv } from '@/src/shared/ui'

export function SkeletonUserProfileSection() {
  return (
    <section className='h-[127px] p-[10px] gap-[10px] w-full flex flex-col'>
      <div className='flex flex-row items-center justify-start gap-[16px]'>
        <div className='flex justify-center items-start gap-[10px]'>
          <SkeletonDiv height={40} width={40} className='rounded-full' />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <SkeletonDiv height={20} width={100} />
          <SkeletonDiv height={14} className='w-full' />
        </div>
      </div>
      <SkeletonDiv height={50} className='w-full' />
    </section>
  )
}
