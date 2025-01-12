import CardUserPlace from '@/src/features/plan/card-user-place'
import Spacer from '@/src/shared/ui/Spacer'

type ListUserPlaceProps = {
  data: {
    id: number
    name: string
    star_rate: string
    created_at: string
    tags: string[]
    images: string[]
    content: string
  }[]
}

export default function ListUserPlace({ data }: ListUserPlaceProps) {
  return (
    <>
      <section className='flex flex-col mt-[15px] gap-[20px]'>
        {data.map((place, index) => (
          <div key={index}>
            <CardUserPlace data={place} />
            <Spacer height={8} className={'mt-[10px] bg-bright-gray'} />
          </div>
        ))}
      </section>
      <Spacer height={15} />
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
      </section>
    </>
  )
}
