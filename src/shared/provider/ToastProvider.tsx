'use client'

import { createContext, useContext, useState } from 'react'
import { Toast } from '../ui'

type ToastContextType = {
  show: (type: 'warning' | 'notice', message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'warning' | 'notice'>('notice')
  const [visible, setVisible] = useState(false)

  const show = (type: 'warning' | 'notice', message: string) => {
    setMessage(message)
    setType(type)
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 2 * 1000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {visible && <Toast type={type} message={message} />}
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
