import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CoursePlaceType } from '@/src/entities/place/type'
import { AlignJustify, X, Image } from 'lucide-react'

interface DragPlaceItemProps {
  id: number
  place: CoursePlaceType
  onEdit?: (id: number) => void
  onDelete: (id: number) => void
}

export default function DragPlaceItem({
  id,
  place,
  onEdit,
  onDelete,
}: DragPlaceItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id)
    }
  }

  return (
    <div
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
      }}
      className='flex items-center justify-between gap-[10px] h-[40px] px-[10px] py-[10px] text-[15px] rounded-full bg-bright-gray'
    >
      <div className='flex items-center gap-[10px]'>
        <div {...attributes} {...listeners} ref={setNodeRef}>
          <AlignJustify size={20} strokeWidth={1.5} stroke={'#5A59F2'} />
        </div>
        <span className='text-[13px]'>{place.name}</span>
      </div>
      {onEdit && (
        <X
          size={20}
          onClick={() => onDelete(place.id)}
          className='cursor-pointer'
          stroke={'#A9A9A9'}
          strokeWidth={1.5}
        />
      )}
    </div>
  )
}
