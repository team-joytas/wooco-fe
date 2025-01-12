import { Button } from 'antd'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PlaceType } from '@/src/entities/place/type'
import { AlignJustify } from 'lucide-react'

interface DragPlaceItemProps {
  id: number
  place: PlaceType
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
      className='flex items-center justify-between gap-[10px] h-[40px] px-[10px] py-[10px] border text-[15px] rounded-[5px] bg-white'
    >
      <div className='flex items-center gap-[10px]'>
        <div {...attributes} {...listeners} ref={setNodeRef}>
          <AlignJustify size={20} strokeWidth={1.5} />
        </div>
        <span className='text-[13px]'>{place.place_name}</span>
      </div>
      <div className='flex gap-[5px]'>
        {onEdit && (
          <Button
            className='text-[10px] border-0 h-[20px] w-[20px]'
            onClick={() => handleEdit(place.id)}
          >
            수정
          </Button>
        )}
        <Button
          className='text-[10px] shadow-none border-0 h-[20px] w-[30px]'
          onClick={() => onDelete(place.id)}
        >
          X
        </Button>
      </div>
    </div>
  )
}
