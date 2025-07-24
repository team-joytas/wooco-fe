'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { KebabMenu } from '@/src/shared/ui'
import { DeleteModal } from '@/src/features'

interface ActionDropdownProps {
  type: string
  id: string
  handleDelete: () => void
  placeId?: string
  setIsEditingComment?: React.Dispatch<React.SetStateAction<boolean>>
}

export function ActionDropdown({
  type,
  id,
  handleDelete,
  placeId,
  setIsEditingComment,
}: ActionDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const handleClickDelete = () => {
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const handleClickUpdate = () => {
    if (setIsEditingComment) {
      setIsEditingComment(true)
    }
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className='relative' ref={ref}>
      <KebabMenu onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
      {isDropdownOpen && (
        <div className='absolute flex flex-col z-[100] top-[30px] right-[10px] w-[93px] shadow-grid h-fit bg-white shawdow-custom text-gray-500 text-sub'>
          {type === 'comment' && setIsEditingComment ? (
            <button
              className='h-[25px] flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-200'
              onClick={handleClickUpdate}
            >
              수정하기
            </button>
          ) : (
            <Link
              className='h-[25px] flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-200'
              href={
                placeId
                  ? `/places/${placeId}/reviews/${id}/update`
                  : `/${type}s/${id}/update`
              }
            >
              수정하기
            </Link>
          )}
          <button
            className='h-[25px] flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-200'
            onClick={handleClickDelete}
          >
            삭제하기
          </button>
        </div>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  )
}
