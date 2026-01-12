'use client'

import { useEffect } from 'react'
import { initFCM } from '@/src/features'
import { useAuth } from '@/src/shared/providers'

export const FcmProvider = () => {
  const { token } = useAuth()
  useEffect(() => {
    if (token) {
      initFCM()
    }
  }, [token])

  return null
}
