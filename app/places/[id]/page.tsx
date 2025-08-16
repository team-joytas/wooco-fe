'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ReviewStats,
  PlaceReviewCard,
  useGetPlaceAggregation,
} from '@/src/entities/place'
import {
  ActionHeader,
  DetailPlaceLayoutSkeleton,
  PlaceFooter,
  Section,
  PlaceReviewLinks,
} from '@/src/widgets'
import { Spacer, KakaoMap } from '@/src/shared/ui'
import { Copy, Phone } from 'lucide-react'
import { ScrollTabs, ScrollTabType } from '@/src/features'
import logo from '@/src/assets/images/(logo)/logo.png'
import { useToast } from '@/src/shared/provider'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: placeData } = useGetPlaceAggregation(id)

  const router = useRouter()
  const { show } = useToast()

  const [activeTab, setActiveTab] = useState<ScrollTabType>('info')
  const infoRef = useRef<HTMLDivElement>(null)
  const reviewRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef<boolean>(false)

  const handleTabClick = useCallback(
    (tab: ScrollTabType, ref: React.RefObject<HTMLDivElement | null>) => {
      isScrollingRef.current = true
      setActiveTab(tab)

      if (ref.current) {
        const top =
          ref.current.getBoundingClientRect().top + window.scrollY - 120
        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    },
    []
  )

  if (!placeData) {
    return <DetailPlaceLayoutSkeleton />
  }

  const { place, place_reviews: placeReviews } = placeData

  const toast = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      show('notice', '주소가 클립보드에 복사되었습니다.')
    })
  }

  const tabs = [
    {
      label: '장소 정보',
      onClick: () => handleTabClick('info', infoRef),
      isActive: activeTab === 'info',
    },
    {
      label: `리뷰 (${place.review_count})`,
      onClick: () => handleTabClick('review', reviewRef),
      isActive: activeTab === 'review',
    },
  ]

  return (
    <>
      <ActionHeader title={place.name || ''} isTitleTag isTitleCenter isBack />
      <div
        className={'w-full flex flex-col items-center min-h-[100vh] bg-white'}
      >
        <Image
          width={375}
          height={210}
          src={place.thumbnail_url || logo}
          alt={place.name || ''}
          className='w-[375px] h-[210px] object-cover'
        />

        <ScrollTabs
          isScrollingRef={isScrollingRef}
          setActiveTab={setActiveTab}
          tabs={tabs ?? []}
          refs={{ info: infoRef, review: reviewRef }}
        />
        <Spacer height={26} />

        <div ref={infoRef} className='w-full flex flex-col items-center'>
          {place.phone_number && (
            <>
              <Section title='매장 번호'>
                <div className='flex flex-row h-[44px] px-[25px] py-[10px] items-center justify-between rounded-full border-0 bg-bright-gray'>
                  <span className='block text-middle text-black max-w-[200px]'>
                    {place.phone_number}
                  </span>
                  <a href={`tel:${place.phone_number}`}>
                    <Phone
                      className='cursor-pointer text-brand'
                      size={16}
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </Section>
              <Spacer height={20} />
            </>
          )}
          <Section title='위치 정보'>
            <div className='flex flex-row h-[44px] px-[25px] py-[10px] items-center justify-between rounded-full border-0 bg-bright-gray'>
              <span className='block text-middle text-black max-w-[200px]'>
                {place.address}
              </span>
              <Copy
                className='cursor-pointer text-brand'
                onClick={() => toast(place.address)}
                size={16}
                strokeWidth={1.5}
              />
            </div>
          </Section>
          <Spacer height={20} />
          <KakaoMap
            place={{
              name: place.name,
              latitude: place.latitude,
              longitude: place.longitude,
            }}
          />

          <Spacer height={20} />
          <Spacer height={4} className='bg-light-gray' />
          <Spacer height={20} />
        </div>

        <div ref={reviewRef} className='w-full flex flex-col items-center'>
          <Section
            title='리뷰'
            subtitle={
              place.place_one_line_review_stats.length > 0
                ? '가장 언급 많은 키워드 랭킹이에요!'
                : ''
            }
            button={
              <button
                className='text-middle text-gray-400'
                onClick={() => router.push(`/places/${id}/reviews/new`)}
              >
                작성하기
              </button>
            }
          >
            {place.review_count !== 0 &&
              place.place_one_line_review_stats.length > 0 && (
                <>
                  <Spacer height={15} />
                  <ReviewStats
                    placeOnLineReviewStats={place.place_one_line_review_stats}
                    AverageRating={place.average_rating}
                  />
                  <Spacer height={15} />
                  <Spacer height={4} className='bg-light-gray' />
                </>
              )}
          </Section>

          {place.review_count !== 0 ? (
            <>
              <div className='flex flex-col w-full px-[20px] py-[20px]'>
                {placeReviews.map((review) => (
                  <PlaceReviewCard
                    key={review.id}
                    placeId={place.id.toString()}
                    content={review}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className='h-[200px] flex items-center justify-center'>
              <span className='text-description text-middle'>
                아직 리뷰를 기다리고 있어요!
              </span>
            </div>
          )}

          <PlaceReviewLinks
            placeId={id}
            kakaoPlaceId={place.kakao_place_id}
            size='large'
          />
        </div>
      </div>

      <Spacer height={25} />
      <PlaceFooter />
    </>
  )
}
