import { TabButtonSkeleton } from '@/src/shared/ui'

export function TabSkeleton() {
  return (
    <div className='w-full pt-[15px] sticky top-[55px] bg-white z-10 flex items-center'>
      <TabButtonSkeleton isActive={true} />
      <TabButtonSkeleton isActive={false} />
    </div>
  )
}
