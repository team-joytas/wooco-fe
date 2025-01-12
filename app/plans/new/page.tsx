'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Cascader, CascaderProps, DatePicker, Drawer, GetProp } from 'antd'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import SearchPlace from '@/src/views/search-place'
import type { PlaceType } from '@/src/entities/place/type'
import { getSeoulData } from '@/src/entities/place/api'
import { latlngMapping } from '@/src/shared/utils/latlngMapping'
import { SeoulType } from '@/src/entities/place/type'
import DragPlace from '@/src/widgets/DragPlace'

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number]

export default function Page() {
  const router = useRouter()

  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [centerLatLng, setCenterLatLng] = useState<number[]>([])
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [date, setDate] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<SeoulType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeoulData()
      setData(data)
    }
    fetchData()
  }, [])

  const onChange = (
    value: (string | number | null)[],
    selectedOptions: DefaultOptionType[]
  ) => {
    setSelectedRegion(value[1] as string)
    setCenterLatLng(latlngMapping[value[1] as string])
    setPlaces((prevPlaces) => [...prevPlaces])
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

  const onChangePlaces = (place: PlaceType) => {
    setPlaces((prevPlaces) => [...prevPlaces, place])
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
              <DragPlace places={places} setPlaces={setPlaces} />
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
