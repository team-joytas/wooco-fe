'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Spacer from '@components/(layout)/Spacer'
import NotificationItem from './components/NotificationItem'
import { Notification, NOTIFICATION_TYPE } from './types'

const notifications: Notification[] = [
  {
    id: 1,
    createdAt: '2024-01-01',
    content: '일상 속 어디든지 나만의 경로로, 좋은 공간 함께 나누고 공유해요',
    type: NOTIFICATION_TYPE.wooco,
  },
  {
    id: 2,
    createdAt: '2024-01-01',
    content: '먹고 구경하고 먹고 강남 한바퀴!',
    type: NOTIFICATION_TYPE.share_course,
  },
  {
    id: 3,
    createdAt: '2024-01-01',
    content: '땀땀',
    type: NOTIFICATION_TYPE.plan_writing,
  },
  {
    id: 4,
    createdAt: '2024-01-01',
    content: '먹고 구경하고 먹고 강남 한바퀴!',
    type: NOTIFICATION_TYPE.plan_review,
  },
  {
    id: 5,
    createdAt: '2024-01-01',
    content: '바그준서',
    type: NOTIFICATION_TYPE.comment,
  },
]

export default function Page() {
  const router = useRouter()
  return (
    <>
      <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <button onClick={() => router.back()}>
          <ChevronLeft size={24} color='black' strokeWidth={1.5} />
        </button>
        <p className='font-semibold text-[17px]'>알림</p>
        <div className='w-[24px] h-[24px]'></div>
      </header>
      <Spacer height={20} />
      <div className='px-[20px] gap-[20px] w-full flex flex-col justify-between'>
        {[...notifications].reverse().map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </>
  )
}
