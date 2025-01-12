'use client'

import ListNotification from '@/src/views/list-notification'
import { getNotifications } from '@/src/entities/notification/api'

export default async function Page() {
  const data = await getNotifications()
  return <ListNotification data={data} />
}
