import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Copy } from 'lucide-react'
import logoDefaultCopy from '@/src/assets/images/(logo)/temp_empty.png'
import kakaoReview from '@/src/assets/images/kakao_review_icon.svg'
import allReview from '@/src/assets/images/all_review_icon.svg'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import { message } from 'antd'
import { Spacer } from '@/src/shared/ui'
import { StarRateView } from '@/src/features'

export function PlaceCollapse({
  places,
  activeIndex,
  setActiveIndex,
}: {
  places: CoursePlanPlaceType[]
  activeIndex: number | null
  setActiveIndex: (key: (prevKey: number | null) => null | number) => void
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
      <div className='rounded-[10px] flex flex-col w-full shadow-md border border-brand gap-[10px] p-[4px]'>
        <div className='h-[160px] overflow-hidden relative rounded-t-[10px]'>
          {place.thumbnail_url ? (
            <Image
              className='rounded-t-[10px]'
              src={place.thumbnail_url}
              alt='place image'
              fill
            />
          ) : (
            <Image
              className='object-cover w-full h-full'
              src={logoDefaultCopy}
              alt='place image not found'
              fill
            />
          )}
        </div>
        <div
          className='flex justify-center items-center rounded-[5px] gap-[10px] py-[10px] bg-black opacity-15 text-white cursor-pointer'
          onClick={() => toast(place.address)}
        >
          <span className='block text-sub text-light max-w-[200px] truncate line-clamp-2'>
            {place.address}
          </span>
          <Copy size={14} strokeWidth={1.5} />
        </div>
        <Spacer height={28} />
        <div className='flex rounded-[10px] items-center justify-between px-[15px]'>
          <div className='flex flex-col justify-end items-center gap-[5px]'>
            <p className='text-headline text-brand font-semibold'>
              {place.average_rating?.toFixed(1)}
            </p>
            <StarRateView rate={place?.average_rating || 0} size={12} />
            <p className='text-sub opacity-50'>
              장소 리뷰 ({place?.review_count || 0})
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-[10px]'>
            <Link href={`/places/${place.id}`}>
              <div className='w-[175px] relative h-[31px] flex flex-row items-center justify-start py-0 pl-[15px] gap-[13px] shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden'>
                <div className='font-semibold w-[82px] text-sub'>
                  전체 리뷰 바로보기
                </div>
                <div className='w-[60px] h-[60px] relative flex justify-center items-center'>
                  <Image className='relative' fill alt='' src={allReview} />
                </div>
              </div>
            </Link>

            <Link
              href={`https://place.map.kakao.com/m/${place.kakao_place_id}`}
            >
              <div className='w-[175px] relative h-[31px] flex flex-row items-center justify-start py-0 pl-[15px] gap-[13px] shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden'>
                <div className='font-semibold w-[91px] text-sub'>
                  카카오 리뷰 바로가기
                </div>
                <div className='w-[47px] h-[44px] relative flex justify-center items-center'>
                  <Image className='relative' fill alt='' src={kakaoReview} />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Spacer height={25} />
        {contextHolder}
      </div>
    ),
  }))
  const toggleItem = (key: number) => {
    setActiveIndex((prevKey) => (prevKey === key ? null : key))
  }
  return (
    <div className='w-full px-[30px]'>
      {items.map((item, index) => {
        const isOpen = activeIndex === index
        return (
          <div key={item.key} className='flex flex-col gap-[15px]'>
            <button
              onClick={() => toggleItem(index)}
              className={`w-full flex justify-between items-center px-[16px] py-[10px] text-left text-middle font-[500] h-[40px]
                bg-bright-gray rounded-full shadow-sm transition-[border] duration-300 ease-in-out ${
                  isOpen
                    ? 'border-[1px] border-brand'
                    : 'border-[1px] border-light-gray'
                }`}
            >
              <div className='flex items-center gap-3'>{item.label}</div>
              {isOpen ? (
                <ChevronUp className='w-[20px] h-[20px] text-gray-500' />
              ) : (
                <ChevronDown className='w-[20px] h-[20px] text-gray-500' />
              )}
            </button>
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
