import { Collapse } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import CoursePlaceCarousel from './CoursePlaceCarousel'

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
  const items = data.map((place) => ({
    key: place.id.toString(),
    label: (
      <div className='flex gap-[10px]'>
        <Image
          className='rounded-[5px]'
          src={place.images[0]}
          width={50}
          height={50}
          alt={place.name}
        />
        <div className='overflow-hidden flex flex-col gap-[5px]'>
          <span className='w-fit'>
            <b>{place.name}</b>
            <span className='text-blue-600'>({place.avg_rate})</span>
          </span>
          <span className='block truncate line-clamp-2'>{place.location}</span>
        </div>
      </div>
    ),
    children: (
      <div className='flex flex-col w-full'>
        <CoursePlaceCarousel data={place.images} />
        <div className='w-full mt-[10px] min-h-[40px] inline-flex flex-wrap gap-[5px]'>
          {place.evaluates.map((data, index) => {
            return (
              <span
                key={index}
                className='h-[30px] px-[10px] border rounded-[20px] bg-slate-100 flex items-center justify-center'
              >
                {data}
              </span>
            )
          })}
        </div>
        <Link
          className='w-full flex items-center justify-center py-[5px] border rounded-[5px] mt-[10px]'
          href={`/places/${place.id}`}
        >
          장소 전체 리뷰 바로가기
        </Link>
        <Link
          className='w-full flex items-center justify-center py-[5px] border rounded-[5px] mt-[10px]'
          href={place.kakao}
        >
          카카오 리뷰 바로가기
        </Link>
      </div>
    ),
  }))

  return (
    <Collapse expandIconPosition={'end'} className='mt-[10px]' items={items} />
  )
}
