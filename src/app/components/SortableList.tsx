import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { Place } from '@components/SearchPlace'
import SortableItem from '@components/SortableItem'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

export default function SortableList({
  places,
  setPlaces,
}: {
  places: Place[]
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>
}) {
  const onChangePlaces = (place: Place) => {
    setPlaces((prevPlaces: Place[]): Place[] => [...prevPlaces, place])
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPlaces((items: Place[]): Place[] => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex) as Place[]
      })
    }
  }

  const handleDelete = (id: string) => {
    setPlaces((prev: Place[]): Place[] =>
      prev.filter((place) => place.id !== id)
    )
  }

  const handleEdit = (id: string) => {
    alert(`${id}번 장소를 수정합니다.`)
  }

  return (
    <div className='w-full flex flex-col gap-[10px]'>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={places} strategy={verticalListSortingStrategy}>
          {places.map((place) => (
            <SortableItem
              key={place.id}
              id={place.id}
              place={place}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
