'use client'

import { CalendarGroupDetailLayout } from '@/src/widgets/calendar-group-detail-layout/CalendarGroupDetailLayout'

export default function Page({ params }: { params: { id: string } }) {
  const groupId = params.id


  return (
    <CalendarGroupDetailLayout id={groupId}/>
  )
}
