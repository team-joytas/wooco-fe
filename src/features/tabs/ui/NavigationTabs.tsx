import { Tab } from '@/src/features/tabs'
import { TabButton } from '@/src/shared/ui'

interface NavigationTabsProps {
  tabs: Tab[]
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
  return (
    <div className='w-full pt-[15px] sticky top-[55px] bg-white z-10 flex items-center'>
      {tabs.map((tab, index) => (
        <TabButton key={index} tab={tab} />
      ))}
    </div>
  )
}
