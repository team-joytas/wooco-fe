'use client'

import { useEffect, useState } from 'react'
import { Input } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import {
  CoursePlaceType,
  PlaceSearchType,
  PlaceType,
} from '@/src/entities/place/type'
import { Dispatch, SetStateAction } from 'react'
import Header from '@/src/widgets/header'
import { postPlace } from '@/src/entities/place/api'

type MetaType = {
  total_count: number
  pageable_count: number
  is_end: boolean
}

interface SearchPlaceProps {
  region: string
  setOpenSearchPlace: (open: boolean) => void
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
}

export default function SearchPlace({
  region,
  setOpenSearchPlace,
  setPlaces,
}: SearchPlaceProps) {
  const [results, setResults] = useState<PlaceSearchType[]>([])
  const [meta, setMeta] = useState<MetaType>() // TODO: 페이지네이션 추가 필요
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const getResult = async (value: string) => {
    if (!value) return

    const result = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${region} ${value}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    )
    const data = await result.json()
    setResults(data.documents)
    setMeta(data.meta)
  }

  const selectPlace = async (place: PlaceSearchType) => {
    setOpenSearchPlace(false)
    const placeId = await postPlace(place)
    const placePayload: CoursePlaceType = {
      id: placeId.results.id,
      order: 0,
      name: place.place_name,
      latitude: place.y,
      longitude: place.x,
      address: place.address_name,
      kakao_map_place_id: Number(place.id),
      thumbnail_url: '',
    }
    setPlaces((prevPlaces) => [...prevPlaces, placePayload])
    setInputValue('')
  }

  return (
    <div className='fixed top-0 transform z-[1000] w-full max-w-[375px] h-full bg-white'>
      <Header title='장소 추가하기' close={() => setOpenSearchPlace(false)} />
      <Spacer height={18} />
      <div className='px-[20px] w-full flex flex-col gap-[15px]'>
        <div className='flex flex-col gap-[10px]'>
          <span className='text-main font-semibold'>장소명</span>
          <Input.Search
            placeholder='장소 이름을 입력해주세요.'
            className='w-full'
            value={inputValue}
            onSearch={getResult}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className='w-full mt-[20px] h-[2px] bg-gray-100' />
        <div className='justify-start items-center overflow-y-auto h-[calc(100vh-200px)]'>
          <div className='h-fit w-full flex flex-col gap-[5px]'>
            {results.length > 0 ? (
              results.map((result) => {
                return (
                  <div
                    key={result.id}
                    className='text-[12px] border-blue-100 rounded-[5px] border-[1px] flex flex-col w-full gap-[5px] px-[15px] py-[8px] cursor-pointer'
                    onClick={() => selectPlace(result)}
                  >
                    <span className='text-[13px] font-bold'>
                      {result.place_name}
                    </span>
                    <span className='text-[10px] text-gray-600'>
                      {result.address_name}
                    </span>
                  </div>
                )
              })
            ) : (
              <div className='w-full h-[40px] flex items-center justify-center text-[15px]'>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
