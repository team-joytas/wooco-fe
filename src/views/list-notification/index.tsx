import Header from '@/src/widgets/Header'
import CardNotification from '@/src/features/notification/card-notification'
import Spacer from '@/src/shared/ui/Spacer'

export type Notification = {
  id: number
  createdAt: string
  content: string
  type: keyof typeof NOTIFICATION_TYPE
}

export const NOTIFICATION_TYPE = {
  comment: 'comment' as const,
  plan_review: 'plan_review' as const,
  plan_writing: 'plan_writing' as const,
  share_course: 'share_course' as const,
  wooco: 'wooco' as const,
}

export default function ListNotification({ data }: { data: Notification[] }) {
  return (
    <>
      <Header title='알림' isBack />
      <Spacer height={20} />
      <div className='px-[20px] gap-[20px] w-full flex flex-col justify-between'>
        {[...data].reverse().map((notification) => (
          <CardNotification key={notification.id} notification={notification} />
        ))}
      </div>
    </>
  )
}
