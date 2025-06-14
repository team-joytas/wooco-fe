import { ActionHeader } from '@/src/widgets'
import { Spacer, SkeletonDiv } from '@/src/shared/ui'
import {
  SkeletonTab,
  SkeletonReviewStats,
  SkeletonPlaceReviewCard,
} from '@/src/features'
import { SkeletonSection } from './skeleton-section'

export function SkeletonDetailPlaceLayout() {
  return (
    <>
      <ActionHeader title={''} isTitleTag isTitleCenter isBack />
      <div className='w-full flex flex-col items-center min-h-[100vh] bg-white'>
        <SkeletonDiv width={375} height={210} />
        <SkeletonTab />
        <Spacer height={26} />

        <div className='w-full flex flex-col items-center gap-[20px]'>
          <SkeletonSection hasChildren />
          <SkeletonSection hasChildren />
          <SkeletonDiv height={180} width={315} className='rounded-[10px]' />
          <Spacer height={4} className='bg-light-gray' />
        </div>

        <Spacer height={20} />

        <div className='w-full flex flex-col items-center gap-[15px]'>
          <SkeletonSection />
          <SkeletonReviewStats />
          <Spacer height={4} className='bg-light-gray' />

          <div className='flex flex-col w-full px-[20px]'>
            {Array.from({ length: 2 }, (_, index) => (
              <SkeletonPlaceReviewCard key={index} />
            ))}
          </div>
          <div className='flex flex-col justify-center items-center gap-[18px]'>
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className='w-[315px] relative h-[45px] flex flex-row items-center justify-start py-0 pl-[64px] gap-[14.73px] shadow-[0px_0px_5.1px_rgba(0,_0,_0,_0.4)] rounded-[99px] overflow-hidden'
              />
            ))}
          </div>
        </div>
      </div>

      <Spacer height={25} />
      <footer className='w-full h-[74px] px-[20px] py-[13px] flex flex-col items-start justify-center gap-[5px] text-[#2A2A2A] bg-[#F5F5F5]'>
        <span className='text-[13px] font-bold'>잘못 제공된 정보 제보!</span>
        <span className='text-[9px]'>
          <p>잘못된 정보를 하단 메일로 제보해주시면 소정의 상품을 드립니다.</p>
          <p>kr.wooco@gmail.com</p>
        </span>
      </footer>
    </>
  )
}
