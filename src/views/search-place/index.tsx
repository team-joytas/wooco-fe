'use client'

import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { ChevronLeft } from 'lucide-react'
import Spacer from '@/src/shared/ui/Spacer'
import { PlaceType } from '@/src/entities/place/type'
import { Dispatch, SetStateAction } from 'react'

type MetaType = {
  total_count: number
  pageable_count: number
  is_end: boolean
}

interface SearchPlaceProps {
  setOpenSearchPlace: (open: boolean) => void
  setPlaces: Dispatch<SetStateAction<PlaceType[]>>
}

export default function SearchPlace({
  setOpenSearchPlace,
  setPlaces,
}: SearchPlaceProps) {
  const [results, setResults] = useState<PlaceType[]>([])
  const [meta, setMeta] = useState<MetaType>() // TODO: 페이지네이션 추가 필요
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getResult(inputValue)
  }, [inputValue])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const getResult = async (value: string) => {
    if (!value) return

    const result = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${value}`,
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

  const selectPlace = (place: PlaceType) => {
    setOpenSearchPlace(false)
    setPlaces((prevPlaces) => [...prevPlaces, place])
    setInputValue('')
  }

  return (
    <div className='fixed top-0 transform z-[1000] w-full max-w-[375px] h-full bg-white'>
      <header className=' bg-white h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <ChevronLeft
          onClick={() => setOpenSearchPlace(false)}
          size={24}
          color='black'
          strokeWidth={1.5}
          className='cursor-pointer'
        />
        <p className='font-semibold text-[17px]'>장소 추가하기</p>
        <div className='w-[24px] h-[24px]'></div>
      </header>
      <Spacer height={18} />
      <div className='px-[20px] w-full flex flex-col gap-[15px]'>
        <div className='flex flex-col gap-[10px]'>
          <span className='text-main font-semibold'>장소명</span>
          <Input.Search
            placeholder='장소 이름을 입력해주세요.'
            className='w-full'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className='w-full mt-[20px] h-[2px] bg-gray-100' />
        <div className='justify-start items-center overflow-y-auto h-[calc(100vh-200px)]'>
          <div className='h-fit w-full flex flex-col gap-[5px]'>
            {results.map((result) => {
              return (
                <div
                  key={result.id}
                  className='text-[12px] border-blue-100 rounded-[5px] border-[1px] flex flex-col w-full gap-[5px] px-[15px] py-[8px] cursor-pointer'
                  onClick={() => {
                    selectPlace(result)
                  }}
                >
                  <span className='text-[13px] font-bold'>
                    {result.place_name}
                  </span>
                  <span className='text-[10px] text-gray-600'>
                    {result.address_name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
