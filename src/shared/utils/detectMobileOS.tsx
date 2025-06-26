'use client'

export type MobileOS = 'A' | 'I' | null

export const detectMobileOS = (): MobileOS => {
  if (typeof window === 'undefined') return null // 서버에서 실행 방지

  const userAgent = navigator.userAgent

  if (/android/i.test(userAgent)) {
    return 'A'
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'I'
  }

  return null
}

import { useState, useEffect } from 'react'

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setIsIOS(detectMobileOS() === 'I')
  }, [])

  return isIOS
}
