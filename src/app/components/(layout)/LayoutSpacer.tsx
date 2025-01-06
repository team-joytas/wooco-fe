'use client'

import { usePathname } from 'next/navigation'

export default function LayoutSpacer() {
  const path = usePathname()
  if (path === '/login') {
    return null
  }
  return <div className='h-[60px]' />
}
