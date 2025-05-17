import { createPortal } from 'react-dom'

interface ModalProps {
  type: 'share' | 'delete'
  isOpen: boolean
  children: React.ReactNode
}

export function Modal({ type, isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-[90]' />
      <div
        className={`w-[300px] ${
          type === 'share' ? 'h-[146px] gap-[13px]' : 'h-[200px]'
        } fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[10px] z-[100] flex flex-col items-center justify-between bg-white shadow-grid`}
      >
        {children}
      </div>
    </>,
    document.body as HTMLElement
  )
}
