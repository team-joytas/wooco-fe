'use client'

import { useState } from 'react'
import { Input, Button, Drawer, Radio, Space } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import PlaceListComponent from './components/PlaceListComponent'
import type { DrawerProps, RadioChangeEvent } from 'antd'
import dragIcon from '@images/drag_icon.png'
import Image from 'next/image'

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

  const categories = [
    { id: 1, value: '맛집' },
    { id: 2, value: '액티비티' },
    { id: 3, value: 'SNS 핫플' },
    { id: 4, value: '문화/예술' },
    { id: 5, value: '기타' },
  ]

  const handleCategoryClick = (id: number) => {
    setClickedCategory((prev) => {
      if (prev.includes(id)) {
        return prev.filter((categoryId) => categoryId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) return

    const reorderedPlaces = Array.from(places)
    const [removed] = reorderedPlaces.splice(source.index, 1)
    reorderedPlaces.splice(destination.index, 0, removed)

    setPlaces(reorderedPlaces)
  }

  return (
    <div className='pt-[20px] pb-[32px] px-[16px] w-full h-[90%] flex flex-col justify-between'>
      <div className='w-full  flex flex-col items-end'>
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
                className={`text-[12px] py-[5px] px-[13px] border rounded-[10px] transition-all duration-200 ${
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
          <div className='flex flex-col gap-[10px]'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='flex flex-col gap-[10px]'
                  >
                    {places.map((place, index) => (
                      <Draggable
                        draggableId={`${place.id}`}
                        key={`${index}`}
                        index={place.id}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='flex items-center gap-[10px] h-[40px] px-[10px] py-[10px] border text-[15px] rounded-[5px] bg-white'
                          >
                            <Image
                              src={dragIcon}
                              width={20}
                              height={15}
                              className='w-[20px] h-[15px]'
                              alt='드래그'
                            />
                            <span className='text-[13px]'>{place.name}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button
              onClick={showDrawer}
              className='w-full h-[40px] text-[15px] rounded-[5px] border border-blue-100 flex items-center justify-center'
            >
              +
            </button>
            <Drawer
              title='추가할 장소 검색'
              size={'large'}
              placement={'bottom'}
              className='w-[375px] rounded-[10px]'
              onClose={onClose}
              open={open}
            ></Drawer>
          </div>
        </div>
      </div>
      <button className='w-full rounded-[5px] mt-[30px] h-[40px] flex items-center justify-center bg-blue-100'>
        완료
      </button>
    </div>
  )
}
