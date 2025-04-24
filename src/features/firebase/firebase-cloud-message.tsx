import { postDeviceToken } from '@/src/entities/notification'
import { app } from '@/firbase'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export const initFCM = () => {
  const messaging = getMessaging(app)
  const loginToken = localStorage.getItem('accessToken')
  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_FIREBASE_VAPID_KEY,
        })
        if (fcmToken && loginToken) {
          await postDeviceToken({ token: fcmToken })
        } else {
          //TODO: FCM token 획득 실패, 예외 처리 필요
        }
      } else {
        //TODO: 알림 권환 획득 실패, 예외 처리 필요
      }
    } catch (error) {
      console.error('FCM 토큰 요청 실패:', error)
    }
  }
  if ('serviceWorker' in navigator) {
    (async () => {
      try {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        await requestPermissionAndGetToken()
      } catch (error) {
        console.error(error)
      }
    })()
  }

  onMessage(messaging, (payload) => {
    if (Notification.permission === 'granted') {
      const title = payload.data?.title
      const body = payload.data?.body

      // const notification_id = payload.data?.notification_id;
      // const user_id = payload.data?.user_id;
      const target_id = payload.data?.target_id
      const target_name = payload.data?.target_name
      const type = payload.data?.type

      const contentMap = {
        COURSE_COMMENT_CREATED: `[${target_name}]에 새로운 댓글이 달렸어요!`,
        PLAN_SHARE_REQUEST: `[${target_name}]가 좋았다면 사람들에게 공유해주세요`,
        PLACE_REVIEW_REQUEST: `[${target_name}]에 대한 장소 리뷰 기다리고 있어요!`,
        SYSTEM: `일상 속 어디든지 나만의 경로로, 좋은 공간 함께 나누고 공유해요`,
      }
      const urlMap = {
        COURSE_COMMENT_CREATED: 'courses/',
        PLAN_SHARE_REQUEST: 'plans/',
        PLACE_REVIEW_REQUEST: 'places/',
        SYSTEM: '',
      }

      const url = 'https://wooco.kr/' + urlMap[type] + target_id

      const notification = new Notification(title || '알림', {
        badge: '/logo_gradation.svg',
        body: contentMap[type] || body || '새로운 메시지가 도착했어요.',
        data: { url },
      })

      notification.onclick = (event) => {
        event.preventDefault()
        if (notification.data?.url) {
          window.open(notification.data.url, '_blank')
        }
      }
    }
  })
}
