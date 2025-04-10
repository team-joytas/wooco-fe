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
