'use client'

import { Carousel } from 'antd'
import Image from 'next/image'

export default function CoursePlaceCarousel({ data }: { data: string[] }) {
  return (
    <Carousel arrows>
      {data.map((image, index) => {
        return (
          <Image
            className='rounded-[5px]'
            key={index}
            src={image}
            alt='place image'
            width={300}
            height={150}
          />
        )
      })}
    </Carousel>
  )
}
