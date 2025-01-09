import { Notification, NOTIFICATION_TYPE } from '../types'
import { MessageCircle, UserRound, SquareGanttChart } from 'lucide-react'
import Image from 'next/image'
import courseColor from '@images/course_color.png'
import logo from '@images/logo.png'

export default function NotificationItem({
  notification,
}: {
  notification: Notification
}) {
  const renderMessage = (type: keyof typeof NOTIFICATION_TYPE) => {
    const iconMap: Record<keyof typeof NOTIFICATION_TYPE, React.ReactNode> = {
      [NOTIFICATION_TYPE.comment]: (
        <MessageCircle fill='#5A59F2' stroke='#5A59F2' strokeWidth={1.5} />
      ),
      [NOTIFICATION_TYPE.plan_review]: (
        <SquareGanttChart stroke='#5A59F2' strokeWidth={1.5} />
      ),
      [NOTIFICATION_TYPE.plan_writing]: (
        <UserRound stroke='#5A59F2' strokeWidth={1.5} />
      ),
      [NOTIFICATION_TYPE.share_course]: (
        <Image src={courseColor} alt='course' width={20} height={20} />
      ),
      [NOTIFICATION_TYPE.wooco]: (
        <Image src={logo} alt='logo' width={20} height={20} />
      ),
    }

    const messageMap: Record<keyof typeof NOTIFICATION_TYPE, string> = {
      [NOTIFICATION_TYPE.comment]: '새로운 댓글이 달렸어요.',
      [NOTIFICATION_TYPE.plan_review]: '코스로 공유할 플랜이 기다리고 있어요.',
      [NOTIFICATION_TYPE.plan_writing]:
        '플랜 어떠셨어요? 장소 리뷰 남겨주세요.',
      [NOTIFICATION_TYPE.share_course]: '혹시 플랜 작성 중이신가요?',
      [NOTIFICATION_TYPE.wooco]: 'Wooco 메시지',
    }

    const contentMap: Record<keyof typeof NOTIFICATION_TYPE, string> = {
      [NOTIFICATION_TYPE.comment]: `[${notification.content}]님이 회원님의 코스에 댓글을 달았어요!`,
      [NOTIFICATION_TYPE.plan_review]: `[${notification.content}]가 좋았다면 사람들에게 공유해주세요!`,
      [NOTIFICATION_TYPE.plan_writing]: `[${notification.content}]에 대한 장소 리뷰 기다리고 있어요!`,
      [NOTIFICATION_TYPE.share_course]: `[${notification.content}]가 아직 완성되지 않았어요!`,
      [NOTIFICATION_TYPE.wooco]: `${notification.content}`,
    }

    return (
      <div className='w-full flex flex-col gap-[5px]'>
        <div className='w-full flex gap-[9px] items-center'>
          {iconMap[type]}
          <p className='text-sub opacity-80 font-semibold'>
            {messageMap[type]}
          </p>
        </div>
        <div className='flex gap-[30px] items-center text-sub text-black opacity-80 w-full px-[20px] py-[15px] bg-light-gray rounded-[10px]'>
          <span className='flex-1 break-keep'>{contentMap[type]}</span>
          <div className='w-[60px] flex flex-col justify-between items-end'>
            <span className='text-sub text-black opacity-80'>N분전</span>
            <span className='text-sub text-black opacity-80'>
              {notification.createdAt}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return <>{renderMessage(notification.type)}</>
}
