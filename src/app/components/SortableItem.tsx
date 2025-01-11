import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Place } from '@/app/components/SearchPlace'
import { AlignJustify, X, Image } from 'lucide-react'

interface SortableItemProps {
  id: string
  place: Place
  onEdit?: (id: string) => void
  onDelete: (id: string) => void
}

export default function SortableItem({
  id,
  place,
  onEdit,
  onDelete,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const handleEdit = (id: string) => {
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
        <span className='text-[13px]'>{place.place_name}</span>
      </div>
      <div className='flex gap-[5px]'>
        {onEdit && (
          <button
            className='text-[10px] border-0 h-[20px] w-[20px]'
            onClick={() => handleEdit(place.id)}
          >
            <Image size={20} stroke={'#A9A9A9'} strokeWidth={1.5} />
          </button>
        )}
        <button
          className='text-[10px] shadow-none border-0 h-[20px] w-[30px]'
          onClick={() => onDelete(place.id)}
        >
          <X size={20} stroke={'#A9A9A9'} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
