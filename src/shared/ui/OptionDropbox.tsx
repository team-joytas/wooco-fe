import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface OptionDropboxProps {
  isOpen: boolean
  onToggle: () => void
  isMine: boolean
  type: string
  id: string
  handleDelete: () => void
  placeId?: string
}

const OptionDropbox = React.forwardRef<HTMLDivElement, OptionDropboxProps>(
  ({ isOpen, onToggle, isMine, type, id, handleDelete, placeId }, ref) => (
    <div className='relative' ref={ref}>
      <EllipsisVertical
        onClick={onToggle}
        className='cursor-pointer'
        size={24}
        strokeWidth={1.5}
      />
      {isOpen && (
        <div className='absolute flex flex-col z-1 top-[30px] right-[10px] w-[93px] shadow-floating-button h-fit bg-light-gray rounded-[10px]'>
          {isMine ? (
            <>
              <Link
                className='h-[25px] text-sub flex items-center justify-center cursor-pointer hover:text-brand transition-all duration-200'
                href={
                  placeId
                    ? `/${type}s/${placeId}/reviews/${id}/update`
                    : `/${type}s/${id}/update`
                }
              >
                수정하기
              </Link>
              <button
                className='h-[25px] text-sub flex items-center justify-center cursor-pointer hover:text-brand transition-all duration-200'
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </>
          ) : (
            <button className='h-[25px] text-sub flex items-center justify-center'>
              신고하기
            </button>
          )}
        </div>
      )}
    </div>
  )
)

OptionDropbox.displayName = 'OptionDropbox'

export default OptionDropbox
