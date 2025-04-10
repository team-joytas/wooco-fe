'use client'

import { ActionHeader } from '@/src/widgets'
import CardNotification from '@/src/features/notification/card-notification'
import { Spacer } from '@/src/shared/ui'
import { useGetNotifications } from '@/src/entities/notification'
import { useEffect } from 'react'

export default function ListNotification() {
  const { data: notificationData, refetch } = useGetNotifications()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <ActionHeader title='알림' isBack />
      <Spacer height={20} />
      <div className='px-[17px] gap-[15px] w-full h-[calc(100vh-75px)] flex flex-col'>
        {notificationData &&
          [...notificationData]
            .reverse()
            .map((notification) => (
              <CardNotification
                key={notification.id}
                notification={notification}
              />
            ))}
      </div>
    </>
  )
}
