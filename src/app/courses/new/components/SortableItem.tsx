import { Button } from 'antd'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import dragIcon from '@images/drag_icon.png'
import Image from 'next/image'

export default function SortableItem({ id, place, onEdit, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      style={style}
      className='flex items-center justify-between gap-[10px] h-[40px] px-[10px] py-[10px] border text-[15px] rounded-[5px] bg-white'
    >
      <div className='flex items-center gap-[10px]'>
        <Image
          {...attributes}
          {...listeners}
          ref={setNodeRef}
          src={dragIcon}
          width={20}
          height={15}
          className='w-[20px] h-[15px]'
          alt='드래그'
        />
        <span className='text-[13px]'>{place.name}</span>
      </div>
      <div className='flex gap-[5px]'>
        <Button
          className='text-[10px] border-0 h-[20px] w-[20px]'
          onClick={() => onEdit(place.id)}
        >
          수정
        </Button>
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
