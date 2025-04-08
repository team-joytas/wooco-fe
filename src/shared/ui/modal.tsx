import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

export function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-[90]' />
      <div className='w-[300px] h-[146px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] z-[100] flex flex-col items-center justify-between gap-[13px] bg-white shadow-floating-button'>
        {children}
      </div>
    </>,
    document.body as HTMLElement
  )
}
