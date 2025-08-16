import { DivSkeleton } from '@/src/shared/ui'

export function UserProfileSectionSkeleton() {
  return (
    <section className='h-[127px] p-[10px] gap-[10px] w-full flex flex-col'>
      <div className='flex flex-row items-center justify-start gap-[16px]'>
        <div className='flex justify-center items-start gap-[10px]'>
          <DivSkeleton height={40} width={40} className='rounded-full' />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <DivSkeleton height={20} width={100} />
          <DivSkeleton height={14} className='w-full' />
        </div>
      </div>
      <DivSkeleton height={50} className='w-full' />
    </section>
  )
}
