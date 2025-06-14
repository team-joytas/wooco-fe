import { SkeletonTabButton } from '@/src/shared/ui'

export function SkeletonTab() {
  return (
    <div className='w-full pt-[15px] sticky top-[55px] bg-white z-10 flex items-center'>
      <SkeletonTabButton isActive={true} />
      <SkeletonTabButton isActive={false} />
    </div>
  )
}
