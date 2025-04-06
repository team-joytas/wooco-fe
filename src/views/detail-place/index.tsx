'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useGetPlace, useGetPlaceReviews } from '@/src/entities/place'
import { HeaderWithBackButton } from '@/src/widgets/header'
import logo from '@/src/assets/images/(logo)/logo.png'
import Image from 'next/image'
import Spacer from '@/src/shared/ui/Spacer'
import { Copy, Phone } from 'lucide-react'
import { message } from 'antd'
import { KakaoMap } from '@/src/shared/ui/KakaoMap'
import ReviewCommentCard from '@/src/widgets/review-comment-card'
import Link from 'next/link'
import allReview from '@/src/assets/images/all_review_icon.svg'
import kakaoReview from '@/src/assets/images/kakao_review_icon.svg'
import { useRouter } from 'next/navigation'
import { ReviewStats, ScrollTabs, ScrollTabType } from '@/src/features'
import { Section } from './section'

export default function DetailPlace({ id }: { id: string }) {
  const { data: placeData } = useGetPlace(id)
  const { data: reviewData, refetch } = useGetPlaceReviews(id)

  const router = useRouter()

  const [activeTab, setActiveTab] = useState<ScrollTabType>('info')
  const infoRef = useRef<HTMLDivElement>(null)
  const reviewRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef<boolean>(false)

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

  const tabs = placeData && [
    {
      label: '장소 정보',
      onClick: () => handleTabClick('info', infoRef),
      isActive: activeTab === 'info',
    },
    {
      label: `리뷰 (${placeData.review_count})`,
      onClick: () => handleTabClick('review', reviewRef),
      isActive: activeTab === 'review',
    },
  ]

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

  if (!placeData || !reviewData) return <div>Loading</div>

  return (
    <>
      <HeaderWithBackButton title={placeData.name || ''} isTitleTag />
      <div
        className={'w-full flex flex-col items-center min-h-[100vh] bg-white'}
      >
        <Image
          width={375}
          height={210}
          src={placeData.thumbnail_url || logo}
          alt={placeData.name || ''}
          className='w-[375px] h-[210px] object-cover'
        />

        <ScrollTabs
          isScrollingRef={isScrollingRef}
          setActiveTab={setActiveTab}
          tabs={tabs}
          refs={{ info: infoRef, review: reviewRef }}
        />
        <Spacer height={26} />

        <div ref={infoRef} className='w-full flex flex-col items-center'>
          {placeData.phone_number && (
            <>
              <Section title='매장 번호'>
                <div className='flex flex-row h-[44px] px-[25px] py-[10px] items-center justify-between rounded-full border-0 bg-bright-gray'>
                  <span className='block text-middle text-black max-w-[200px]'>
                    {placeData.phone_number}
                  </span>
                  <a href={`tel:${placeData.phone_number}`}>
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
                {placeData.address}
              </span>
              <Copy
                className='cursor-pointer text-brand'
                onClick={() => toast(placeData.address)}
                size={16}
                strokeWidth={1.5}
              />
            </div>
          </Section>
          <Spacer height={20} />
          <KakaoMap
            place={{
              name: placeData.name,
              latitude: placeData.latitude,
              longitude: placeData.longitude,
            }}
          />

          <Spacer height={20} />
          <Spacer height={8} className='bg-light-gray' />
          <Spacer height={20} />
        </div>

        <div ref={reviewRef} className='w-full flex flex-col items-center'>
          <Section
            title='리뷰'
            subtitle='가장 언급 많은 키워드 랭킹이에요!'
            button={
              <span
                className='text-sub text-gray-400'
                onClick={() => router.push(`/places/${id}/reviews/new`)}
              >
                작성하기
              </span>
            }
          >
            <Spacer height={15} />
            {reviewData.length === 0 ? (
              <ReviewStats
                placeOnLineReviewStats={placeData.place_one_line_review_stats}
                AverageRating={placeData.average_rating}
              />
            ) : (
              <div className='h-[100px] flex items-center justify-center'>
                <span className='text-description text-sub'>
                  아직 리뷰를 기다리고 있어요!
                </span>
              </div>
            )}
            <Spacer height={15} />
          </Section>

          {reviewData.length === 0 && (
            <>
              <Spacer height={20} />
              <Spacer height={8} className='bg-light-gray' />

              <div className='flex flex-col w-full gap-[25px] px-[20px]'>
                <Spacer height={4} />
                {reviewData.map((review) => (
                  <ReviewCommentCard
                    key={review.id}
                    id={placeData.id.toString()}
                    content={review}
                    refetch={refetch}
                  />
                ))}
                <Spacer height={24} />
              </div>

              <Spacer height={8} className='bg-light-gray' />
              <Spacer height={20} />

              <div className='flex flex-col justify-center items-center gap-[18px]'>
                <Link href={`/places/${id}/reviews`}>
                  <div className='w-[315px] relative h-[45px] flex flex-row items-center justify-start py-0 pl-[64px] gap-[14.73px] shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden'>
                    <div className='font-bold w-[120px] text-main flex items-center'>
                      전체 리뷰 바로보기
                    </div>
                    <div className='w-[75px] h-[75px] relative flex justify-center items-center'>
                      <Image className='relative' fill alt='' src={allReview} />
                    </div>
                  </div>
                </Link>

                <Link
                  href={`https://place.map.kakao.com/m/${placeData.kakao_place_id}`}
                >
                  <div className='w-[315px] relative h-[45px] flex flex-row items-center justify-start py-0 pl-[64px] gap-[14.73px] shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden'>
                    <div className='font-bold w-[132px] text-main flex items-center'>
                      카카오 리뷰 바로가기
                    </div>
                    <div className='w-[73px] h-[68px] relative flex justify-center items-center'>
                      <Image
                        className='relative'
                        fill
                        alt=''
                        src={kakaoReview}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
        {contextHolder}
      </div>
    </>
  )
}
