'use client'

import { Modal } from '@/src/shared/ui'
import { useState } from 'react'

interface DeleteModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleDelete: () => void
}

export function DeleteModal({
  isOpen,
  setIsOpen,
  handleDelete,
}: DeleteModalProps) {
  const [isClicked, setIsClicked] = useState(false)

  const onDelete = () => {
    setIsClicked(!isClicked)
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    handleDelete()
  }

  return (
    <Modal type='delete' isOpen={isOpen}>
      <section className='flex flex-col flex-1 gap-[12px] items-center justify-center'>
        <span className='flex flex-col text-headline02 text-brand font-bold text-center'>
          <p>삭제 후에는</p>
          <p>복구할 수 없어요!</p>
        </span>
        <span className='text-middle01 text-gray-600'>정말 삭제하시나요?</span>
      </section>

      <div className='flex flex-row h-[56px] w-full 0 text-middle'>
        <button
          className='flex-1 items-center justify-center bg-gray-100 text-gray-700 flex gap-[10px] rounded-bl-[10px] '
          onClick={() => setIsOpen(false)}
        >
          취소
        </button>
        <button
          onClick={() => onDelete()}
          className='flex-1 items-center justify-center flex gap-[10px] bg-brand  text-white rounded-br-[10px]'
          disabled={isClicked}
        >
          네, 삭제할게요
        </button>
      </div>
    </Modal>
  )
}
