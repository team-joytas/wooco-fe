importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js'
)

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  const targetUrl = event.notification.data?.url

  if (!targetUrl) return

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl)
        }
      })
  )
})

const firebaseConfig = {
  apiKey: 'AIzaSyDoedunVjEmdmVraM_L9xrN6HNKMinue7o',
  authDomain: 'wooco-d72ba.firebaseapp.com',
  projectId: 'wooco-d72ba',
  storageBucket: 'wooco-d72ba.firebasestorage.app',
  messagingSenderId: '48093061821',
  appId: '1:48093061821:web:4aac24e5a09e82625b8dd4',
  measurementId: 'G-R5NZNL4Z67',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title
  const body = payload.data?.body

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
  const options = {
    badge: '/logo_gradation.svg',
    body: contentMap[type] || body || '새로운 메시지가 도착했어요.',
    data: { url },
  }

  self.registration.showNotification(title || '알림', options)
})
