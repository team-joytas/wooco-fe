import { ChevronLeft } from 'lucide-react'

export const BackButton = ({ onClick }: { onClick: () => void }) => (
  <ChevronLeft
    onClick={onClick}
    size={24}
    color='black'
    strokeWidth={1.5}
    className='cursor-pointer'
  />
)
