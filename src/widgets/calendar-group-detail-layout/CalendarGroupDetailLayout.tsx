'use client'

import { ActionHeader } from '@/src/widgets'
import Image from 'next/image'
import checkIcon from '@/src/assets/icon/medium/check_colored.svg'
import copyIcon from '@/src/assets/icon/medium/copy_24.svg'
import crossIcon from '@/src/assets/icon/medium/cross.svg'
import alertIcon from '@/src/assets/icon/medium/alert_colored.svg'


export function CalendarGroupDetailLayout({id}:{id:string}) {
  const groupColor = "1C2D3F"
  return (
    <>
      <ActionHeader title="그룹 관리" isBack={true}/>
      <div className="flex flex-col gap-6 px-4 py-5">
        <div className='w-full h-full max-w-md px-2.5 py-4 rounded-xl bg-white shadow-[0_0_18px_rgba(0,0,0,0.15)]'>
          <span className="text-main01 font-main01">그룹 이름</span>
          <form
            // onSubmit={handleSubmit}
            className='my-1.5 flex flex-col gap-1.5 '
          >
            <div className='w-full rounded-lg border-gray-200 border-[1px] py-2.5 px-3 flex justify-between relative'>
              <hr className="w-0.5 h-6 mr-1.5  bg-black-50"/>
              <input
                type='text'
                // value={groupName}
                // onChange={(e) => setGroupName(e.target.value)}
                placeholder='홍의 캘린더 2025년 06월 17일'
                className='bg-transparent outline-none w-full text-middle01 font-middle01 text-gray-700 '
              />
              <Image src={checkIcon} alt='checkIcon' />
            </div>
          </form>
          <div className="flex justify-end">
            <span className="font-sub01 text-sub01 text-gray-400">0/30</span>
          </div>
        </div>

        <div className='w-full h-full max-w-md flex flex-row justify-between items-center px-2.5 py-4 rounded-xl bg-white shadow-[0_0_18px_rgba(0,0,0,0.15)]'>
          <span className="text-main01 font-main01">그룹 색상</span>
          <span
            className='w-4 h-4 rounded-full inline-block'
            style={{
              backgroundColor: `#${groupColor}`,
            }}
          />
        </div>

        <div className='w-full h-full max-w-md px-2.5 py-4 flex flex-col gap-4 rounded-xl bg-white shadow-[0_0_18px_rgba(0,0,0,0.15)]'>
          <span className="text-main01 font-main01">멤버 관리</span>
          <form
            // onSubmit={handleSubmit}
            className='my-1.5 flex flex-col gap-1.5 '
          >
            <div className='w-full rounded-lg border-gray-200 border-[1px] py-2.5 px-3 flex justify-between relative'>
              <input
                type='text'
                // value={groupName}
                // onChange={(e) => setGroupName(e.target.value)}
                placeholder='http://'
                className='bg-transparent outline-none w-full text-middle01 font-middle01 text-gray-700 '
              />
              <Image src={copyIcon} alt='copyIcon' />
            </div>
          </form>

          <button className="w-full h-[51px] rounded-xl text-white text-middle01 font-middle01 bg-wooco_blue-secondary flex justify-center items-center">새 링크 생성</button>
          {Array.from({ length: 3 }, (_, index) => (
            <GroupMemberCard key={index} name={'홍홍'} role={'멤버'} onClick={() => {}}/>
          ))}
          <div className="flex justify-end">
            <span className="font-sub01 text-sub01 text-gray-400">3/15</span>
          </div>
        </div>
      </div>
      <hr/>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-row py-2.5 items-center gap-[7px]">
          <Image src={alertIcon} alt='alertIcon' />
          <span className=" text-sub01  font-sub01 text-gray-400 whitespace-break-spaces">그룹을 삭제하면 모든 일정과 데이터가 영구적으로 삭제되며 <br/> 이 작업은 되돌릴 수 없습니다.</span>
        </div>
      </div>
      <button className="w-full h-[54px] text-gray-700 text-main01 font-main01 bg-gray-150 py-2.5 flex justify-center items-center hover:bg-gray-400 cursor-pointer">그룹 삭제하기</button>
    </>
  )
}

function GroupMemberCard({
  name,
  role,
  onClick,
}: {
  name: string
  role: string
  onClick: () => void
})  {
  return (
    <div className="w-full p-4 flex justify-between items-center bg-gray-100 rounded-lg">
      <div className="flex flex-row items-center gap-3">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center"></div>
        <div className="flex flex-col">
          <span className="h-[21px] text-middle01 font-middle01 text-gray-700">{name}</span>
          <span className="text-sub02 font-sub02 text-gray-400">{role}</span>
        </div>
      </div>
      <button onClick={onClick}>
        <Image src={crossIcon} alt='crossIcon' />
      </button>
    </div>
  )
}