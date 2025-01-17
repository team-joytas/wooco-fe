import { Collapse } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { Copy } from 'lucide-react'
import allReview from '@/src/assets/images/all_review.png'
import kakaoReview from '@/src/assets/images/kakao_review.png'
import StarRate from '@/src/shared/ui/StarRate'
import { Carousel } from 'antd'
import type { CoursePlaceType } from '@/src/entities/place/type'
import { message } from 'antd'

export default function PlaceCollapse({
  places,
}: {
  places: CoursePlaceType[]
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

  const items = places.map((place, index) => ({
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
      <div className='flex flex-col w-full'>
        {place.thumbnail_url && (
          <Image
            className='rounded-t-[10px]'
            src={place.thumbnail_url}
            alt='place image'
            width={300}
            height={150}
          />
        )}
        <div className='flex justify-center items-center gap-[10px] py-[10px] bg-black13 text-white'>
          <span className='block text-sub text-light max-w-[200px] truncate line-clamp-2'>
            {place.address}
          </span>
          <button className='cursor-pointer' onClick={() => toast(place.name)}>
            <Copy size={14} strokeWidth={1.5} />
          </button>
        </div>
        <div className='flex bg-bright-gray rounded-[10px] justify-between p-[15px]'>
          <div className='flex flex-col justify-end'>
            <p className='text-headline text-brand font-semibold'>
              {place.average_rating}
            </p>
            <StarRate rate={place.average_rating} size={10} />
            <p className='text-sub opacity-50'>
              장소 리뷰 {place.review_count}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center gap-[5px]'>
            <Link href={`/places/${place.id}`}>
              <Image src={allReview} alt='all review' width={175} height={31} />
            </Link>
            <Link
              href={`https://place.map.kakao.com/m/${place.kakao_map_place_id}`}
            >
              <Image
                src={kakaoReview}
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

  return (
    <Collapse expandIconPosition={'end'} className='mt-[10px]' items={items} />
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
