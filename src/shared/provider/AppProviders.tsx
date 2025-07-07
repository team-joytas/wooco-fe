'use client'

import { ReactNode } from 'react'
import {
  AuthProvider,
  ReactQueryProvider,
  ToastProvider,
  FcmProvider,
} from '@/src/shared/provider'
import { ConfigProvider } from 'antd'
import { AnimatePresence } from 'framer-motion'

const theme = {
  token: {
    borderRadius: 10,
    colorPrimary: '#5A59F2',
    colorBgContainer: '#F7F7F7',
    colorBorder: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.5)',
    fontSize: 11,
  },
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <FcmProvider />
        <ToastProvider>
          <ConfigProvider theme={theme}>
            <AnimatePresence>{children}</AnimatePresence>
          </ConfigProvider>
        </ToastProvider>
      </ReactQueryProvider>
    </AuthProvider>
  )
}
