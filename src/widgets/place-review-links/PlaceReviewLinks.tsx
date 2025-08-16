import Link from 'next/link'
import allReview from '@/src/assets/images/all_review_icon.svg'
import kakaoReview from '@/src/assets/images/kakao_review_icon.svg'
import Image from 'next/image'

type Size = 'small' | 'large'

interface PlaceReviewLinksProps {
  placeId: string
  kakaoPlaceId: string
  size: Size
}

interface ButtonConfig {
  text: string
  href: string
  image: string
  width: {
    text: string
    image: string
  }
  imageSize: {
    width: string
    height: string
  }
}

export function PlaceReviewLinks({
  placeId,
  kakaoPlaceId,
  size,
}: PlaceReviewLinksProps) {
  const sizeConfig = {
    small: {
      container: 'gap-[10px]',
      button: 'w-[175px] h-[31px] pl-[15px] gap-[13px]',
      text: 'font-semibold text-sub',
      imageContainer: {
        allReview: 'w-[60px] h-[60px]',
        kakaoReview: 'w-[47px] h-[44px]',
      },
    },
    large: {
      container: 'gap-[18px]',
      button: 'w-[315px] h-[45px] pl-[64px] gap-[14.73px]',
      text: 'font-bold text-main',
      imageContainer: {
        allReview: 'w-[75px] h-[75px]',
        kakaoReview: 'w-[73px] h-[68px]',
      },
    },
  }

  const config = sizeConfig[size]

  const buttons: ButtonConfig[] = [
    {
      text: '전체 리뷰 바로보기',
      href:
        size === 'small' ? `/places/${placeId}` : `/places/${placeId}/reviews`,
      image: allReview,
      width: {
        text: size === 'small' ? 'w-[82px]' : 'w-[120px]',
        image: config.imageContainer.allReview,
      },
      imageSize: {
        width: size === 'small' ? '60px' : '75px',
        height: size === 'small' ? '60px' : '75px',
      },
    },
    {
      text: '카카오 리뷰 바로가기',
      href: `https://place.map.kakao.com/m/${kakaoPlaceId}`,
      image: kakaoReview,
      width: {
        text: size === 'small' ? 'w-[91px]' : 'w-[132px]',
        image: config.imageContainer.kakaoReview,
      },
      imageSize: {
        width: size === 'small' ? '47px' : '73px',
        height: size === 'small' ? '44px' : '68px',
      },
    },
  ]

  return (
    <div
      className={`flex flex-col justify-center items-center ${config.container}`}
    >
      {buttons.map((button, index) => (
        <Link key={index} href={button.href}>
          <div
            className={`
            ${config.button}
            relative flex flex-row items-center justify-start py-0
            shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden
          `}
          >
            <div
              className={`${config.text} ${button.width.text} ${size === 'large' ? 'flex items-center' : ''}`}
            >
              {button.text}
            </div>
            <div
              className={`${button.width.image} relative flex justify-center items-center`}
            >
              <Image
                className='relative'
                fill
                alt={button.text}
                src={button.image}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
