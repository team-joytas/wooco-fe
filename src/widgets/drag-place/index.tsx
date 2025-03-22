import { CoursePlanPlaceType } from '@/src/entities/place'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import DragPlaceItem from '@/src/features/place/drag-place-item'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Dispatch, SetStateAction, useMemo } from 'react'

interface DragPlaceProps {
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
}

export default function DragPlace({ places, setPlaces }: DragPlaceProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPlaces((items: CoursePlanPlaceType[]) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDelete = (id: number) => {
    setPlaces((prev: CoursePlanPlaceType[]) =>
      prev.filter((place) => place.id !== id)
    )
  }

  const memoizedPlaces = useMemo(
    () => places.map((place) => place.id),
    [places]
  )

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={memoizedPlaces}
          strategy={verticalListSortingStrategy}
        >
          {places.map((place) => (
            <DragPlaceItem
              key={place.id}
              id={place.id}
              place={place}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
