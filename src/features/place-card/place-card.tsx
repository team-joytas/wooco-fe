import Image from 'next/image'
import { Spacer, StarRate } from '@/src/shared/ui'
import Link from 'next/link'
import type { UserPlaceReviewType } from '@/src/entities/place'
import { formatDateToYYYYMMDD } from '@/src/shared/utils/date'
import { ReviewTag } from '@/src/features'

export function PlaceCard({ data }: { data: UserPlaceReviewType }) {
  return (
    <Link
      href={`/places/${data.place_id}`}
      className='w-full h-fit px-[20px] flex flex-col'
    >
      <section className='w-full justify-between flex gap-[10px]'>
        <div className='flex flex-col gap-[19px]'>
          <div className='flex flex-col'>
            <p className='text-main font-bold'>{data.place_name}</p>
            <span className='text-sub opacity-50'>
              {formatDateToYYYYMMDD(data.created_at, 'hypen')}
            </span>
          </div>
          <div className='flex flex-col gap-[5px] w-[170px]'>
            <span className='text-brand text-middle leading-none'>
              {data.rating}
            </span>
            <StarRate rate={data.rating} size={10} />
            <div className='flex flex-row gap-[5px] items-center flex-wrap'>
              {data.one_line_reviews.map((keyword, index) => (
                <ReviewTag key={index} keyword={keyword.toString()} />
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-end'>
          {data.image_urls.length > 0 && (
            <Image
              className='rounded-[10px] w-[98px] h-[98px]'
              width={98}
              height={98}
              src={data.image_urls[0]}
              alt={data.place_name}
            />
          )}
        </div>
      </section>

      <Spacer height={10} />
      <span className='text-sub opacity-80 font-medium break-keep line-clamp-2'>
        {data.contents}
      </span>
      <Spacer height={8} />
    </Link>
  )
}
