import { UserPlaceReviewType, PlaceCard } from '@/src/entities/place'
import { Spacer } from '@/src/shared/ui'

export function ListUserPlace({ reviews }: { reviews: UserPlaceReviewType[] }) {
  return (
    <div className='flex flex-col h-full justify-between'>
      {reviews.length === 0 ? (
        <section className='flex flex-col items-center'>
          <Spacer height={143} />
          <span className='p-[10px] flex flex-col items-center text-description text-middle justify-center gap-[5px]'>
            아직 작성된 장소 리뷰가 없어요!
          </span>
        </section>
      ) : (
        <section className='flex flex-col mt-[15px] gap-[20px]'>
          {reviews.map((review, index) => (
            <div key={index}>
              <PlaceCard data={review} />
              <Spacer height={8} className={'mt-[10px] bg-bright-gray'} />
            </div>
          ))}
        </section>
      )}

      {/* TODO: 장소 리뷰 작성 안된 코스 정보 
      <section className='flex flex-col'>
        <div className='flex flex-col px-[20px]'>
          <p className='text-main font-semibold text-header-line'>
            아직 리뷰를 기다리고 있어요!
          </p>
          <span className='text-sub opacity-50'>
            코스로 공유한 장소들 상세 후기를 들려주세요
          </span>
        </div>
        <Spacer height={10} />
        <div className='flex-1  h-fit overflow-x-auto flex gap-[9px] scrollbar-hide pr-[20px]'>
          <div className='w-fit flex gap-[9px] pl-[20px]'>
            <div className='bg-light-gray w-[98px] h-[98px] rounded-[10px]'></div>
            <div className='bg-light-gray w-[98px] h-[98px] rounded-[10px]'></div>
            <div className='bg-light-gray w-[98px] h-[98px] rounded-[10px]'></div>
            <div className='bg-light-gray w-[98px] h-[98px] rounded-[10px]'></div>
            <div className='bg-light-gray w-[98px] h-[98px] rounded-[10px]'></div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
