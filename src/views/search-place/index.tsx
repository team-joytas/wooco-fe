'use client'

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Spacer } from '@/src/shared/ui'
import { ActionHeader } from '@/src/widgets'
import {
  getPlaceSearchResult,
  postPlace,
  CoursePlanPlaceType,
  PlaceSearchType,
} from '@/src/entities/place'
import { Search } from 'lucide-react'

type MetaType = {
  total_count: number
  pageable_count: number
  is_end: boolean
}

interface SearchPlaceProps {
  region: string
  setOpenSearchPlace: (open: boolean) => void
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
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

    const data = await getPlaceSearchResult(region, value)
    setResults(data.documents)
    setMeta(data.meta)
  }

  const selectPlace = async (place: PlaceSearchType) => {
    setOpenSearchPlace(false)
    const placeId = await postPlace(place)
    const placePayload: CoursePlanPlaceType = {
      id: placeId.id,
      order: 0,
      name: place.place_name,
      latitude: place.y,
      longitude: place.x,
      address: place.address_name,
      kakao_place_id: place.id,
      thumbnail_url: '',
    }
    setPlaces((prevPlaces) => [...prevPlaces, placePayload])
    setInputValue('')
  }

  return (
    <div className='fixed top-0 transform z-[1000] w-full max-w-[375px] h-full bg-white'>
      <ActionHeader
        title='장소 추가하기'
        close={() => setOpenSearchPlace(false)}
      />
      <Spacer height={18} />
      <div className='px-[20px] w-full flex flex-col gap-[15px]'>
        <div className='flex flex-col gap-[15px] items-center justify-center'>
          <span className='text-main font-semibold w-full'>장소명</span>
          <div className='w-[304px] h-[36px] px-[14px] py-[10px] rounded-full bg-gray-100 flex flex-row items-center justify-start box-border gap-[10px] focus:outline-container-light-blue focus:outline-[0.5px]'>
            <Search width={14} size={14} />
            <input
              className='w-[114.29%] flex-1 text-main01 text-gray-800 bg-transparent outline-0 scale-[0.875] origin-left outline-none'
              placeholder='장소 이름을 입력해주세요.'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return
                if (e.key === 'Enter') {
                  getResult(inputValue)
                }
              }}
              autoFocus
            />
          </div>
          <Spacer height={8} className='bg-bright-gray opacity-50' />
        </div>
        <div className=' overflow-y-auto h-[calc(100vh-200px)]'>
          <div className='h-fit w-full flex flex-col gap-[13px] p-10 justify-center items-center'>
            {results.length > 0 ? (
              results.map((result) => {
                return (
                  <div
                    key={result.id}
                    className='shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[10px] bg-white flex flex-col justify-center items-start w-[320px] min-h-[97px] gap-[11px] px-[13px] py-[10px] cursor-pointer hover:outline-wooco_blue-primary hover:outline hover:outline-[2px]'
                    onClick={() => selectPlace(result)}
                  >
                    <span className='text-main01 text-gray-900 font-bold flex gap-[9px] items-center'>
                      {result.place_name}
                      <span className='text-sub01 font-semibold'>
                        {result.category_group_name}
                      </span>
                    </span>
                    <div className='flex flex-col gap-[6px] text-gray-800 text-sub01 font-semibold'>
                      <span>{result.address_name}</span>
                      <span>{result.road_address_name}</span>
                    </div>
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
