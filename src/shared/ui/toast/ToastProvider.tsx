'use client'

import { createContext, useContext, useState } from 'react'
import { Toast } from './Toast'

type ToastContextType = {
  show: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const show = (message: string) => {
    setMessage(message)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 2 * 1000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {visible && <Toast message={message} />}
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }
  return context
}
