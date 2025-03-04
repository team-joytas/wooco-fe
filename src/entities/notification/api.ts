import { NOTIFICATION_TYPE } from '@/src/entities/notification/type'

const notifications = [
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

export const getNotifications = async () => {
  return notifications
}
