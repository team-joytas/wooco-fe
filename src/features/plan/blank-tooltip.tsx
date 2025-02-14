export default function BlankTooltip() {

  return (
    <div className='flex relative justify-center items-center w-full'>
      <div className="fixed top-[529px] inline-flex flex-col items-center">
        <div className="w-[285px] h-auto p-[16px] bg-white rounded-2xl shadow-[0px_2px_7px_0px_rgba(0,0,0,0.12)] flex flex-col justify-start items-center gap-[8px]">
          <div className="text-center h-[24px] text-black text-[20px] font-bold">
            가고 싶은 곳들을 하나로!
          </div>
          <div className="text-center h-[36px] text-[#333333] text-[14px] font-medium">
            내 손으로 고른 장소들, <br /> 미리 계획하고 저장해볼까요?
          </div>
        </div>
        <div className="absolute bottom-[-15px] right-4 ">
          <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3397 15C11.5699 16.3333 9.64544 16.3333 8.87564 15L0.215393 0L21 0L12.3397 15Z" fill="white"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
