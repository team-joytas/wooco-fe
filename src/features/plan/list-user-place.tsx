import Spacer from '@/src/shared/ui/Spacer'
import logo from '@/src/assets/images/(logo)/logo.png'
import Image from 'next/image'
import { Tooltip } from 'antd'

export default function ListUserPlace() {
  const content = (
    <div className='p-[10px] flex flex-col items-center justify-center gap-[5px]'>
      <p className='text-main text-black font-semibold'>
        빠른 시일 내에 찾아 뵙겠습니다.
      </p>
      <p className='text-sub opacity-50 text-black'>- Team WOOCO -</p>
    </div>
  )
  return (
    <div className='relative w-full h-full mt-[50px] flex flex-col items-center text-main font-semibold'>
      <p className='text-main mt-[50px] font-semibold opacity-50'>
        아직 준비중이에요!
      </p>
      <Spacer height={43} />
      <Tooltip title={content} color='white' placement='top' open zIndex={1}>
        <Image
          src={logo}
          alt='logo'
          className='absolute top-[200px]'
          width={55}
          height={55}
        />
      </Tooltip>
    </div>
  )
}

/*
function ArchiveListUserPlace({ data }: ListUserPlaceProps) {
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

*/
