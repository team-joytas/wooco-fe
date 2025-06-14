import { SkeletonDiv } from '@/src/shared/ui'

export function SkeletonSection({ hasChildren }: { hasChildren?: boolean }) {
  return (
    <div className={'w-full flex flex-col gap-[15px] px-[20px]'}>
      <SkeletonDiv height={17} width={100} />
      {hasChildren && (
        <div className='flex flex-row h-[44px] px-[25px] py-[10px] items-center justify-between rounded-full border-0 bg-bright-gray'>
          <span className='block text-middle text-black max-w-[200px]' />
        </div>
      )}
    </div>
  )
}
