'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Cascader, CascaderProps, DatePicker, Drawer, GetProp } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import getData from '@/app/getData'
import KakaoMap from '@/app/components/KakaoMap'
import { Place } from '@/app/components/SearchPlace'
import SearchPlace from '@/app/components/SearchPlace'
import { closestCenter, DndContext } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from '@/app/components/SortableItem'

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number]

export default function Page() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [centerLatLng, setCenterLatLng] = useState<number[]>([])
  const [places, setPlaces] = useState<Place[]>([])
  const [date, setDate] = useState<string>('')
  const { data, latlngMapping } = getData()
  const [open, setOpen] = useState(false)

  const onChange = (value: string[]) => {
    setSelectedRegion(value[1])
    setCenterLatLng(latlngMapping[value[1]])
    setPlaces((prevPlaces) => [...prevPlaces]) // 지도 중심좌표 초기화
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    )

  const onClose = () => {
    setOpen(false)
  }

  const onChangePlaces = (place: Place) => {
    setPlaces((prevPlaces) => [...prevPlaces, place])
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

  const placesWithId = places.map((place) => ({
    ...place,
  }))

  const handleDelete = (id: string) => {
    setPlaces((prev) => prev.filter((place) => place.id !== id))
  }

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
        <p className='font-semi-bold'>새로운 코스 플랜</p>
      </div>

      <div className='h-full mt-[20px]'>
        <Cascader
          options={data}
          placeholder='지역을 선택해 주세요'
          onChange={onChange}
          size='large'
          showSearch={{ filter }}
          style={{ width: '100%' }}
          expandTrigger='hover'
        />

        {selectedRegion && (
          <>
            <KakaoMap id={1} places={places} center={centerLatLng} />

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
                장소 추가
              </button>
            </section>

            <section className='flex flex-row absolute justify-between bottom-[20px] left-0 right-0 px-[16px] gap-[10px]'>
              <DatePicker
                placeholder='날짜를 선택해 주세요'
                style={{ width: '100%' }}
                onChange={(date, dateString) => setDate(String(dateString))}
              />
              <button
                className={`bottom-[10px] w-[80px] text-white bg-blue-100 rounded-[5px] px-[10px] py-[5px] text-[13px] font-semi-bold
                    ${
                      places.length === 0 || !date
                        ? 'cursor-default'
                        : 'bg-blue-800 bg-opacity-80'
                    }`}
                disabled={places.length === 0 || !date}
                onClick={submitPlan}
              >
                완료
              </button>
            </section>
          </>
        )}

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
    </div>
  )
}
