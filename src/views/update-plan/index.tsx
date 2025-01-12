'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import { DatePicker, Drawer } from 'antd'
import SearchPlace, { Place } from '@/app/components/SearchPlace'
import { useState } from 'react'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from '@/app/components/SortableItem'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { TrendingCourseType } from '@/src/entities/course/type'

export default function UpdatePlan({ data }: { data: any }) {
  const router = useRouter()
  const [places, setPlaces] = useState<Place[]>(data.places)
  const [date, setDate] = useState<string>('2024-12-25')
  const [open, setOpen] = useState(false)

  dayjs.extend(customParseFormat)
  const dateFormat = 'YYYY-MM-DD'

  const onClose = () => {
    setOpen(false)
  }

  const onChangePlaces = (place: Place) => {
    setPlaces((prevPlaces) => [...prevPlaces, place])
  }

  const handleDelete = (id: string) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setPlaces((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const placesWithId = places.map((place) => ({ ...place }))

  const submitPlan = () => {
    router.push('/schedules')
  }

  return (
    <div className='w-full h-[calc(100%-50px)] pt-[20px] pb-[20px] px-[16px] flex flex-col relative'>
      <div className='border-b text-[18px] inline-flex items-center'>
        <ArrowLeftOutlined
          className='text-[15px] cursor-pointer mr-[10px]'
          onClick={() => router.back()}
        />
        <p className='font-semi-bold'>{data.location} 코스 플랜</p>
      </div>

      <KakaoMap places={data.places} id={Number(data.id)} />

      <section className='flex flex-col mt-[20px] gap-[10px]'>
        <span className='text-[15px] font-semi-bold'>| 장소 추가</span>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={placesWithId}
            strategy={verticalListSortingStrategy}
          >
            {places.map((place) => (
              <SortableItem
                key={place.id}
                id={place.id}
                place={place}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </DndContext>
        <button
          className='flex items-center justify-center w-full h-[30px] text-[13px] px-[10px] py-[5px] border border-blue-800 border-opacity-50 rounded-[5px] '
          onClick={() => setOpen(true)}
        >
          +
        </button>
      </section>

      <section className='flex flex-row absolute justify-between bottom-[20px] left-0 right-0 px-[16px] gap-[10px]'>
        <DatePicker
          placeholder='날짜를 선택해 주세요'
          style={{ width: '100%' }}
          defaultValue={dayjs(data.planned_for, dateFormat)}
          onChange={(date, dateString) => setDate(String(dateString))}
        />
        <button
          className={`bottom-[10px] w-[80px] text-white bg-blue-100 rounded-[5px] px-[10px] py-[5px] text-[13px] font-semi-bold
                    ${
                      places.length === 0 || !date
                        ? 'cursor-default'
                        : 'bg-blue-800 bg-opacity-50'
                    }`}
          disabled={places.length === 0 || !date}
          onClick={submitPlan}
        >
          수정
        </button>
      </section>
      <Drawer
        title='장소 검색'
        height={600}
        placement={'bottom'}
        className='w-[90%] max-w-[330px] rounded-t-[10px] mx-auto my-0'
        onClose={onClose}
        open={open}
        maskClosable
      >
        <SearchPlace onOpenDrawer={setOpen} onSelectPlace={onChangePlaces} />
      </Drawer>
    </div>
  )
}
