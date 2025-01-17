import { Tooltip } from 'antd'

export default function BlankTooltip() {
  const content = (
    <div className='flex flex-col items-center gap-[8px] text-center py-[10px] mx-[50px] whitespace-nowrap '>
      <span className='text-headline font-bold text-[#333333]'>
        가고 싶은 곳들을 하나로!
      </span>
      <span className='text-middle text-description'>
        <p>내 손으로 고른 장소들</p>
        <p>미리 계획하고 저장해볼까요?</p>
      </span>
    </div>
  )

  return (
    <div className='flex relative justify-center items-center w-full h-full'>
      <span className='text-middle text-description w-full text-center'>
        아직 플랜이 없어요!
      </span>

      <Tooltip title={content} color='white' placement='topRight' open>
        <div className='absolute bottom-[100px] right-[25px]' />
      </Tooltip>
    </div>
  )
}
