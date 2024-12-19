'use client'

import { useState } from 'react'
import { Input, Drawer } from 'antd'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from './components/SortableItem'
import SearchPlace from './components/SearchPlace'
import { categories } from '@/types/Categories'

export default function Page() {
  const [clickedCategory, setClickedCategory] = useState<number[]>([])
  const [places, setPlaces] = useState([
    { id: 1, name: '땀땀 강남점' },
    { id: 2, name: '마녀주방 강남점' },
    { id: 3, name: '미도인 강남' },
    { id: 4, name: '정돈 강남점' },
  ])
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const handleCategoryClick = (id: number) => {
    setClickedCategory((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    )
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setPlaces((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDelete = (id: number) => {
    setPlaces((prev) => prev.filter((place) => place.id !== id))
  }

  const handleEdit = (id: number) => {
    alert(`${id}번 장소를 수정합니다.`)
  }

  return (
    <div className='pt-[20px] pb-[32px] px-[16px] w-full flex flex-col justify-between'>
      <div className='w-full flex flex-col items-end'>
        <p className='m-auto border-b font-semibold text-[18px]'>코스 작성</p>
        <div className='w-full mt-[20px] flex flex-col gap-[5px]'>
          <span className='text-[15px]'>코스 이름</span>
          <Input showCount allowClear maxLength={20} />
        </div>
        <div className='w-full mt-[10px] mb-[10px] flex flex-col gap-[5px]'>
          <span className='text-[15px]'>코스 리뷰</span>
          <Input.TextArea allowClear showCount autoSize maxLength={200} />
        </div>
        <div className='w-full mt-[10px] flex flex-col'>
          <span className='text-[15px]'>코스 카테고리</span>
          <div className='mt-[5px] inline-flex flex-wrap gap-[5px]'>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`text-[12px] py-[5px] px-[13px] border rounded-[10px] transition-all duration-200 cursor-pointer ${
                  clickedCategory.includes(category.id)
                    ? 'bg-blue-100 border-blue-100'
                    : 'border-gray-300'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.value}
              </button>
            ))}
          </div>
        </div>
        <div className='w-full mt-[20px] mb-[20px] h-[2px] bg-gray-100' />
        <div className='w-full flex flex-col gap-[10px]'>
          <span className='text-[15px]'>코스 내 장소 정보</span>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={places}
              strategy={verticalListSortingStrategy}
            >
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
          <button
            onClick={showDrawer}
            className='w-full h-[40px] text-[15px] rounded-[5px] border border-blue-100 flex items-center justify-center'
          >
            +
          </button>
          <Drawer
            title='장소 검색'
            height={600}
            placement={'bottom'}
            className='w-full rounded-[10px]'
            onClose={onClose}
            open={open}
            mask={true}
          >
            <SearchPlace />
          </Drawer>
        </div>
      </div>
      <button className='w-full rounded-[5px] mt-[40px] text-[12px] h-[40px] flex items-center justify-center bg-blue-100'>
        완료
      </button>
    </div>
  )
}
