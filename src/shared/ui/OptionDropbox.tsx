import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface OptionDropboxProps {
  isOpen: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
  onToggle: () => void
  isMine: boolean
  type: string
  id: string
  handleDelete: () => void
  placeId?: string
  isComment?: boolean
  setIsEditingComment?: React.Dispatch<React.SetStateAction<boolean>>
}

const OptionDropbox = React.forwardRef<HTMLDivElement, OptionDropboxProps>(
  (
    {
      isOpen,
      setIsOpen,
      onToggle,
      isMine,
      type,
      id,
      handleDelete,
      placeId,
      isComment,
      setIsEditingComment,
    },
    ref
  ) => {
    const handleUpdateComment = () => {
      if (setIsEditingComment) {
        setIsEditingComment(true)
      }
      if (setIsOpen) {
        setIsOpen(false)
      }
    }

    return (
      <div className='relative' ref={ref}>
        <EllipsisVertical
          onClick={onToggle}
          className='cursor-pointer'
          size={18}
          strokeWidth={1.5}
        />
        {isMine && isOpen && (
          <div className='absolute flex flex-col z-[100] top-[30px] right-[10px] w-[93px] shadow-floating-button h-fit bg-light-gray rounded-[10px]'>
            {isComment && setIsEditingComment ? (
              <div
                className='h-[25px] text-sub flex items-center justify-center cursor-pointer hover:text-brand transition-all duration-200'
                onClick={handleUpdateComment}
              >
                수정하기
              </div>
            ) : (
              <Link
                className='h-[25px] text-sub flex items-center justify-center  hover:text-brand transition-all duration-200'
                href={
                  placeId
                    ? `/${type}s/${placeId}/reviews/${id}/update`
                    : `/${type}s/${id}/update`
                }
              >
                수정하기
              </Link>
            )}
            <button
              className='h-[25px] text-sub flex items-center justify-center  hover:text-brand transition-all duration-200'
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    )
  }
)

OptionDropbox.displayName = 'OptionDropbox'

export default OptionDropbox
