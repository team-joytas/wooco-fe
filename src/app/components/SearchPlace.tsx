import { useEffect, useState } from 'react'
import { Input } from 'antd'

export interface Place {
  id?: string
  place_name: string
  category_name?: string
  address_name: string
  road_address_name?: string
  place_url?: string
  phone?: string
  distance?: string
  x: string
  y: string
}

interface Meta {
  total_count: number
  pageable_count: number
  is_end: boolean
}

interface SearchPlaceProps {
  onOpenDrawer?: (open: boolean) => void
  onSelectPlace?: (place: Place) => void
}

export default function SearchPlace({
  onOpenDrawer,
  onSelectPlace,
}: SearchPlaceProps) {
  const [results, setResults] = useState<Place[]>([])
  const [meta, setMeta] = useState<Meta>() // TODO: 페이지네이션 추가 필요
  const [inputValue, setInputValue] = useState('')

  const getResult = async (value: string) => {
    console.log('value: ', value)
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

  const selectPlace = (place: Place) => {
    if (onOpenDrawer && onSelectPlace) {
      onOpenDrawer(false)
      onSelectPlace(place)
      setInputValue('')
    }
  }

  useEffect(() => {
    getResult(inputValue)
  }, [inputValue])

  return (
    <div className='max-w-[375px] w-full m-auto'>
      <div className='flex flex-col gap-[10px]'>
        <span className='text-[15px] font-semibold'>장소명</span>
        <Input.Search
          placeholder='장소 이름을 입력해주세요.'
          className='w-full'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='w-full mt-[20px] mb-[20px] h-[2px] bg-gray-100' />
      <div className='flex flex-col gap-[5px] justify-start items-center'>
        {results.map((result) => {
          return (
            <div
              key={result.id}
              className='text-[12px] border-blue-100 rounded-[5px] border-[1px] flex flex-col w-full gap-[5px] px-[15px] py-[8px] cursor-pointer'
              onClick={() => {
                selectPlace(result)
              }}
            >
              <span className='text-[13px] font-bold'>{result.place_name}</span>
              <span className='text-[10px] text-gray-600'>
                {result.address_name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
