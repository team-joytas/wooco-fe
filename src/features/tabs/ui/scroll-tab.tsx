'use client'

import { Dispatch, useEffect } from 'react'
import { TabButton } from '@/src/shared/ui'
import { ScrollTabType, Tab } from '@/src/features/tabs'

interface ScrollTabsProps {
  isScrollingRef: React.RefObject<boolean>
  tabs: Tab[]
  setActiveTab: Dispatch<React.SetStateAction<ScrollTabType>>
  refs: { [key: string]: React.RefObject<HTMLDivElement | null> }
}

export function ScrollTabs({
  isScrollingRef,
  tabs,
  setActiveTab,
  refs,
}: ScrollTabsProps) {
  const getTop = (key: string) =>
    (refs[key]?.current?.getBoundingClientRect().top ?? Infinity) - 105

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return

      const infoTop = getTop('info')
      const reviewTop = getTop('review')

      if (infoTop <= 0 && reviewTop > 0) {
        setActiveTab('info')
      } else if (reviewTop <= 0) {
        setActiveTab('review')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [refs, setActiveTab])

  return (
    <div className='w-full pt-[15px] sticky top-[55px] bg-white z-10 flex items-center'>
      {tabs.map((tab, index) => (
        <TabButton key={index} tab={tab} />
      ))}
    </div>
  )
}
