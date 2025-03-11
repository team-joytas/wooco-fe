import { MessageCircle, UserRound } from 'lucide-react'
import Image from 'next/image'
import logo from '@/src/assets/images/(logo)/logo.png'
import courseColor from '@/src/assets/images/course_color.png'
import { NotificationType } from '@/src/entities/notification/type'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import { usePatchReadNotification } from '@/src/entities/notification/query'
import Link from 'next/link'

export default function CardNotification({
  notification,
}: {
  notification: NotificationType
}) {
  const { id, type, target_id, target_name, is_read, sent_at } = notification

  const TYPE_MAP: { [key: string]: string } = {
    COURSE_COMMENT_CREATED: 'course',
    PLAN_SHARE_REQUEST: 'plan',
    PLACE_REVIEW_REQUEST: 'place',
    SYSTEM: 'system',
  }

  const iconMap: { [key: string]: JSX.Element } = {
    COURSE_COMMENT_CREATED: (
      <MessageCircle fill='#5A59F2' stroke='none' size={20} strokeWidth={1.5} />
    ),
    PLAN_SHARE_REQUEST: (
      <Image src={courseColor} alt='course' width={20} height={20} />
    ),
    PLACE_REVIEW_REQUEST: <UserRound stroke='#5A59F2' strokeWidth={1.5} />,
    SYSTEM: <Image src={logo} alt='logo' width={20} height={20} />,
  }

  const messageMap: { [key: string]: string } = {
    COURSE_COMMENT_CREATED: '새로운 댓글이 달렸어요.',
    PLAN_SHARE_REQUEST: '코스로 공유할 플랜이 기다리고 있어요.',
    PLACE_REVIEW_REQUEST: '플랜 어떠셨어요? 장소 리뷰 남겨주세요.',
    SYSTEM: '우코 회원이 되신 걸 축하드려요!',
  }

  const contentMap: { [key: string]: string } = {
    COURSE_COMMENT_CREATED: `[${target_name}]에 새로운 댓글이 달렸어요!`,
    PLAN_SHARE_REQUEST: `[${target_name}]가 좋았다면 사람들에게 공유해주세요`,
    PLACE_REVIEW_REQUEST: `[${target_name}]에 대한 장소 리뷰 기다리고 있어요!`,
    SYSTEM: `일상 속 어디든지 나만의 경로로, 좋은 공간 함께 나누고 공유해요`,
  }

  const notificationType = TYPE_MAP[type]

  const { mutate: readNotification } = usePatchReadNotification()

  if (!notificationType) {
    return null
  }

  return (
    <Link
      href={`${TYPE_MAP[type]}s/${target_id}`}
      key={id}
      className={`w-full flex flex-col gap-[5px] cursor-pointer ${
        is_read ? 'opacity-50' : ''
      }`}
      onClick={() => {
        if (!is_read) {
          readNotification(id.toString())
        }
      }}
    >
      <div className='w-full flex gap-[9px] items-center'>
        {iconMap[type]}
        <p className='text-sub text-more font-semibold'>{messageMap[type]}</p>
      </div>
      <div className='flex gap-[54px] items-center text-sub text-black opacity-80 w-full px-[16px] py-[10px] bg-light-gray rounded-[10px]'>
        <span className='flex-1 break-word w-[208px] px-[10px] leading-normal font-semibold'>
          {contentMap[type]}
        </span>
        <div className='w-[60px] flex flex-col justify-between items-end'>
          <span className='text-sub text-black opacity-80'>
            {passFromCreate(sent_at)}
          </span>
          <span className='text-sub text-black opacity-80'>
            {formatDateToYYYYMMDD(sent_at, 'slash')}
          </span>
        </div>
      </div>
    </Link>
  )
}
