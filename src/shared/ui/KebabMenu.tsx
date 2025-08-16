import { EllipsisVertical } from 'lucide-react'

export function KebabMenu({ onClick }: { onClick: () => void }) {
  return (
    <EllipsisVertical
      onClick={onClick}
      className='cursor-pointer'
      size={18}
      strokeWidth={1.5}
    />
  )
}
