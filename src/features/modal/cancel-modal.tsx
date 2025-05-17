'use client'

import { Modal } from '@/src/shared/ui'
import { useState } from 'react'

interface CancelModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export function CancelModal({
  isOpen,
  setIsOpen,
  setIsEditing,
}: CancelModalProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClickCancel = () => {
    setIsClicked(true)
    setIsOpen(false)
    setIsEditing(false)
  }

  return (
    <Modal type='cancel' isOpen={isOpen}>
      <section className='flex flex-col flex-1 gap-[12px] items-center justify-center'>
        <span className='flex flex-col text-headline02 text-brand font-bold text-center'>
          <p>수정 내용이</p>
          <p>저장되지 않았어요.</p>
        </span>
        <span className='text-middle01 text-gray-600'>
          그래도 종료하시나요?
        </span>
      </section>

      <div className='flex flex-row h-[56px] w-full 0 text-middle'>
        <button
          className='flex-1 items-center justify-center bg-gray-100 text-gray-700 flex gap-[10px] rounded-bl-[10px] '
          onClick={() => setIsOpen(false)}
        >
          취소
        </button>
        <button
          onClick={handleClickCancel}
          className='flex-1 items-center justify-center flex gap-[10px] bg-brand  text-white rounded-br-[10px]'
          disabled={isClicked}
        >
          네, 종료할게요
        </button>
      </div>
    </Modal>
  )
}
