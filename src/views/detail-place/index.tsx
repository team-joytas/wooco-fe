'use client'

import { useGetPlace, useGetPlaceReviews } from '@/src/entities/place/query'
import TabButton from '@/src/features/user/user-tab-button'
import { PlaceHeader } from '@/src/widgets/header'
import logo from '@/src/assets/images/(logo)/logo.png'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Spacer from '@/src/shared/ui/Spacer'
import { Copy, Phone } from 'lucide-react'
import { message } from 'antd'
import { KakaoMap } from '@/src/shared/ui/KakaoMap'
import CardReview from '@/src/features/place/card-review'
import Link from 'next/link'
import allReview from '@/src/assets/images/all_review_long.png'
import kakaoReview from '@/src/assets/images/kakao_review_long.png'
import { useRouter } from 'next/navigation'
import StatsReview from '@/src/features/place/stats-review'

export default function DetailPlace({ id }: { id: string }) {
  const { data: placeData } = useGetPlace(id)
  const { data: reviewData } = useGetPlaceReviews(id)

  const router = useRouter()

  const [isInfoTab, setIsInfoTab] = useState(true)
  const infoRef = useRef<HTMLDivElement>(null)
  const reviewRef = useRef<HTMLDivElement>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

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

  useEffect(() => {
    if (!infoRef.current) return

    const infoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInfoTab(true)
        } else {
          setIsInfoTab(false)
        }
      },
      { threshold: 0.3 }
    )

    infoObserver.observe(infoRef.current)

    return () => {
      infoObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!reviewRef.current || !infoRef.current) return

    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }

    const offset = isInfoTab
      ? infoRef.current.offsetTop - 60
      : reviewRef.current.offsetTop - 60

    if (!isInfoTab) {
      window.scrollTo({ top: offset, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }, [isInfoTab])

  if (!placeData || !reviewData) return <div>Loading</div>

  return (
    <>
      <PlaceHeader title={placeData.name || ''} isLiked={false} />
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

        <div className='w-full pt-[15px] sticky top-0 bg-[#F2F2F2] z-10 flex items-center'>
          <TabButton isActive={isInfoTab} onClick={() => setIsInfoTab(true)}>
            장소 정보
          </TabButton>
          <TabButton isActive={!isInfoTab} onClick={() => setIsInfoTab(false)}>
            리뷰 ({placeData.review_count})
          </TabButton>
        </div>
        <Spacer height={26} />

        <div ref={infoRef} className='w-full flex flex-col items-center'>
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

        <Section
          title='리뷰'
          subtitle='가장 언급 많은 키워드 랭킹이에요!'
          button={
            <span
              className='text-sub text-gray-400 cursor-pointer'
              onClick={() => router.push(`/places/${id}/reviews/new`)}
            >
              작성하기
            </span>
          }
          ref={reviewRef}
        >
          <StatsReview
            placeOnLineReviewStats={placeData.place_on_line_review_stats}
            AverageRating={placeData.average_rating}
          />
        </Section>

        <Spacer height={20} />
        <Spacer height={8} className='bg-light-gray' />
        <Spacer height={20} />
        <div className='flex flex-col gap-[25px] px-[15px]'>
          {reviewData.map((review) => (
            <CardReview
              key={review.id}
              review={review}
              placeId={placeData.id}
            />
          ))}
        </div>

        <Spacer height={20} />
        <Spacer height={8} className='bg-light-gray' />
        <Spacer height={20} />

        <div className='flex flex-col justify-center items-center gap-[5px]'>
          <Link href={`/places/${id}/reviews`}>
            <Image src={allReview} alt='all review' width={300} height={30} />
          </Link>
          <Link
            href={`https://place.map.kakao.com/m/${placeData.kakao_map_place_id}`}
          >
            <Image
              src={kakaoReview}
              alt='kakao review'
              width={300}
              height={30}
            />
          </Link>
        </div>

        {contextHolder}
      </div>
    </>
  )
}

interface SectionProps {
  ref?: React.RefObject<HTMLDivElement>
  title: string
  subtitle?: string
  button?: React.ReactNode
  children: React.ReactNode
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ title, subtitle, button, children }, ref) => {
    return (
      <div className={'w-full flex flex-col gap-[15px] px-[20px]'} ref={ref}>
        {button ? (
          <div className={'flex justify-between items-center'}>
            <span className={'text-main font-semibold'}>{title}</span>
            {button}
          </div>
        ) : (
          <span className={'text-main font-semibold'}>{title}</span>
        )}
        {subtitle && (
          <span className={'text-sub text-description mt-[-10px]'}>
            {subtitle}
          </span>
        )}
        {children}
      </div>
    )
  }
)

Section.displayName = 'Section'
