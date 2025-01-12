import { PlaceType } from '@/src/entities/place/type'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import DragPlaceItem from '@/src/features/place/drag-place-item'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Dispatch, SetStateAction } from 'react'

interface DragPlaceProps {
  places: PlaceType[]
  setPlaces: Dispatch<SetStateAction<PlaceType[]>>
  onEdit?: (id: number) => void
}

export default function DragPlace({
  places,
  setPlaces,
  onEdit,
}: DragPlaceProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPlaces((items: PlaceType[]) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const placesWithId = places.map((place) => ({
    ...place,
  }))

  const handleDelete = (id: number) => {
    setPlaces((prev: PlaceType[]) => prev.filter((place) => place.id !== id))
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext
        items={placesWithId}
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
  )
}
