import { CoursePlanPlaceType, PlaceCollapse } from '@/src/entities/place'
import { ActiveKakaoMap } from '@/src/shared/ui'
import { useState } from 'react'

export function Places({
  places,
  username,
}: {
  places: CoursePlanPlaceType[]
  username: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      {places && places.length > 0 && (
        <div className='px-[30px]'>
          <ActiveKakaoMap places={places || []} activeIndex={activeIndex} />
        </div>
      )}

      <div className='space-y-[10px]'>
        <p className='px-[50px] text-sub text-[rgba(0,0,0,0.8)]'>
          <span className='text-brand font-normal'>{username}</span>
          &nbsp; 님의 코스 제안이에요.
        </p>

        <PlaceCollapse
          places={places || []}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </>
  )
}
