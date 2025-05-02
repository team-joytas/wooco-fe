'use client'

import { ReactNode } from 'react'
import { AuthProvider, ReactQueryProvider } from '@/src/shared/provider'
import { ToastProvider } from '@/src/shared/ui'
import { ConfigProvider } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { MessageProvider } from '@/src/shared/lib'

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
        <ToastProvider>
          <ConfigProvider theme={theme}>
            <AnimatePresence>
              <MessageProvider>{children}</MessageProvider>
            </AnimatePresence>
          </ConfigProvider>
        </ToastProvider>
      </ReactQueryProvider>
    </AuthProvider>
  )
}
