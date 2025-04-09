import { LayoutGrid, List } from 'lucide-react'

export const ViewTypeToggleButton = ({
  isListView,
  onClick,
}: {
  isListView: boolean
  onClick: () => void
}) =>
  isListView ? (
    <LayoutGrid
      size={17}
      strokeWidth={1.5}
      onClick={onClick}
      className='cursor-pointer'
    />
  ) : (
    <List
      size={18}
      strokeWidth={1.5}
      onClick={onClick}
      className='cursor-pointer'
    />
  )
