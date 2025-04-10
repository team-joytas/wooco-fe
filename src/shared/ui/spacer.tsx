'use client'

import { usePathname } from 'next/navigation'

export function Spacer({
  className,
  height,
  notShowURLs,
}: {
  className?: string
  height: number
  notShowURLs?: string[]
}) {
  const path = usePathname()
  if (path && notShowURLs?.includes(path)) {
    return null
  }
  return (
    <div
      className={className}
      style={{ width: '100%', height: `${height}px` }}
    />
  )
}

export function Divider({ margin }: { margin: number }) {
  return (
    <>
      <Spacer height={margin} />
      <Spacer height={8} className='bg-bright-gray' />
      <Spacer height={margin} />
    </>
  )
}
