import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Copy } from 'lucide-react'
import logoDefaultCopy from '@/src/assets/images/(logo)/temp_empty.png'
import allReview from '@/src/assets/images/all_review.png'
import kakaoReview from '@/src/assets/images/kakao_review.png'
import StarRate from '@/src/shared/ui/StarRate'
import type { CoursePlanPlaceType } from '@/src/entities/place/type'
import { message } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import { useState } from 'react'

export default function PlaceCollapse({
  places,
}: {
  places: CoursePlanPlaceType[]
}) {
  const [messageApi, contextHolder] = message.useMessage()

  const toast = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      messageApi.open({
        type: 'success',
        content: '주소가 클립보드에 복사되었습니다.',
        duration: 1,
      })
    })
  }

  const sortedPlaces = [...places].sort((a, b) => a.order - b.order)

  const items = sortedPlaces.map((place, index) => ({
    key: place.id.toString(),
    label: (
      <div className='flex gap-[10px] items-center'>
        <p className='w-[13px] h-[13px] flex items-center justify-center bg-container-light-blue text-[9px] rounded-full text-white'>
          {index + 1}
        </p>
        <p className='w-fit'>{place.name}</p>
      </div>
    ),
    children: (
      <div className='rounded-[10px] border-[1px] border-brand bg-light-gray flex flex-col w-full'>
        <div className='h-[224px] overflow-hidden relative rounded-t-[10px]'>
          {place.thumbnail_url ? (
            <Image
              className='rounded-t-[10px]'
              src={place.thumbnail_url}
              alt='place image'
              width={300}
              height={150}
            />
          ) : (
            <Image
              className='object-cover w-full h-full'
              src={logoDefaultCopy['src']}
              alt='place image not found'
              fill
            />
          )}
        </div>
        <div className='flex justify-center items-center gap-[10px] py-[10px] bg-black13 text-white'>
          <span className='block text-sub text-light max-w-[200px] truncate line-clamp-2'>
            {place.address}
          </span>
          <Copy
            className='cursor-pointer'
            onClick={() => toast(place.address)}
            size={14}
            strokeWidth={1.5}
          />
        </div>
        <div className='flex rounded-[10px] justify-between p-[15px]'>
          <div className='flex flex-col justify-end'>
            <p className='text-headline text-brand font-semibold'>
              {place.average_rating}
            </p>
            <StarRate rate={place?.average_rating || 0} size={10} />
            <p className='text-sub opacity-50'>
              장소 리뷰 {place?.review_count || 0}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-[5px]'>
            <Link href={`/places/${place.id}`}>
              <Image
                src={allReview['src']}
                alt='all review'
                width={175}
                height={31}
              />
            </Link>
            <Link
              href={`https://place.map.kakao.com/m/${place.kakao_map_place_id}`}
            >
              <Image
                src={kakaoReview['src']}
                alt='kakao review'
                width={175}
                height={31}
              />
            </Link>
          </div>
        </div>
        {contextHolder}
      </div>
    ),
  }))
  const [openKey, setOpenKey] = useState<string | null>(null)
  console.table(places)
  const toggleItem = (key: string) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key))
  }

  return (
    // <Collapse
    //   expandIconPosition={'end'}
    //   className='
    //     {/*mt-10 bg-transparent*/}
    //     mt-2 rounded-lg bg-transparent
    //     [&_.ant-collapse-item]:!mb-4
    //     [&_.ant-collapse-content-box]:!p-0 !bg-bright-gray
    //     [&_.ant-collapse-header]:!border-none !rounded-xl'
    //   items={items}
    // />
    <div className='w-full'>
      {items.map((item) => {
        const isOpen = openKey === item.key
        return (
          <div key={item.key}>
            <button
              onClick={() => toggleItem(item.key)}
              className={`w-full flex justify-between items-center px-4 py-3 text-left text-middle font-[500] 
                bg-bright-gray rounded-xl shadow-sm transition-[border] duration-300 ease-in-out ${
                  isOpen
                    ? 'border-[1px] border-brand'
                    : 'border-[1px] border-white'
                }`}
            >
              <div className='flex items-center gap-3'>{item.label}</div>
              {isOpen ? (
                <ChevronUp className='w-5 h-5 text-gray-500' />
              ) : (
                <ChevronDown className='w-5 h-5 text-gray-500' />
              )}
            </button>
            <Spacer height={15} />
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                isOpen ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              {item.children}
              <Spacer height={15} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* TODO: 장소 이미지 여러개로 변환 시
function PlaceImage({ images }: { images: string[] }) {
  return (
    {place.images && place.images.length > 0 && (
          <Carousel arrows>
            {place.images?.map((image, index) => {
              return (
                <Image
                  className='rounded-t-[10px]'
                  key={index}
                  src={image}
                  alt='place image'
                  width={300}
                  height={150}
                />
              )
            })}
          </Carousel>
        )}
  )
}
*/
