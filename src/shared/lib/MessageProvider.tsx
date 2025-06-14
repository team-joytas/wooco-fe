'use client'

import { createContext, useContext } from 'react'
import { message } from 'antd'

const MessageApiContext = createContext<
  ReturnType<typeof message.useMessage>[0] | null
>(null)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <MessageApiContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageApiContext.Provider>
  )
}

export function useMessageApi() {
  const context = useContext(MessageApiContext)
  if (!context) {
    throw new Error('useMessageApi는 MessageProvider 안에서만 사용 가능합니다.')
  }
  return context
}
