import { Collapse } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import CoursePlaceCarousel from './CoursePlaceCarousel'
import { Copy } from 'lucide-react'
import allReview from '@images/all_review.png'
import kakaoReview from '@images/kakao_review.png'
import StarRate from '@components/StarRate'

const data = [
  {
    id: 1,
    name: '땀땀 본점',
    location: '서울특별시 강남구 강남대로98길 12-5',
    avg_rate: 4.1,
    images: [
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    ],
    evaluates: ['맛있어요', '매장이깔끔해요', '주차장이넓어요', '친절해요'],
    content: '땀땀땀땀땀',
    kakao: 'https://place.map.kakao.com/1238400864',
  },
  {
    id: 2,
    name: '마녀주방 강남점',
    location: '서울특별시 강남구 강남대로94길 9',
    avg_rate: 4.2,
    images: [
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    ],
    evaluates: ['맛있어요', '매장이깔끔해요'],
    content:
      '마녀주방 강남점마녀주방 강남점마녀주방 강남점마녀주방 강남점마녀주방 강남점마녀주방 강남점',
    kakao: 'https://place.map.kakao.com/26330643',
  },
  {
    id: 3,
    name: '미도인 강남',
    location: '서울특별시 강남구 강남대로102길 16',
    avg_rate: 4.2,
    evaluates: ['맛있어요', '매장이깔끔해요'],
    images: [
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    ],
    contet:
      '미도인 강남미도인 강남미도인 강남미도인 강남미도인 강남미도인 강남',
    kakao: 'https://place.map.kakao.com/1804968253',
  },
  {
    id: 4,
    name: '정돈 강남점',
    location: '서울특별시 강남구 강남대로110길 19-1',
    avg_rate: 4.5,
    evaluates: ['맛있어요', '매장이깔끔해요'],
    images: [
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    ],
    content: '정돈 정돈 정돈 정돈 정돈 정돈 정돈 정돈 정돈 정돈 정돈 정돈 ',
    kakao: 'https://place.map.kakao.com/850873071',
  },
]

export default function PlaceCollapse() {
  const items = data.map((place, index) => ({
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
        <CoursePlaceCarousel data={place.images} />
        <div className='flex justify-center items-center gap-[10px] py-[10px] bg-black13 text-white'>
          <span className='block text-sub text-light max-w-[200px] truncate line-clamp-2'>
            {place.location}
          </span>
          <Copy size={14} strokeWidth={1.5} />
        </div>
        <div className='flex bg-bright-gray rounded-[10px] justify-between p-[15px]'>
          <div className='flex flex-col justify-end'>
            <p className='text-headline text-brand font-semibold'>4.0</p>
            <StarRate rate={4.0} size={10} />
            <p className='text-sub opacity-50'>장소 리뷰 20</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-[5px]'>
            <Link href={`/places/${place.id}`}>
              <Image src={allReview} alt='all review' width={175} height={31} />
            </Link>
            <Link href={place.kakao}>
              <Image
                src={kakaoReview}
                alt='kakao review'
                width={175}
                height={31}
              />
            </Link>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <Collapse expandIconPosition={'end'} className='mt-[10px]' items={items} />
  )
}
