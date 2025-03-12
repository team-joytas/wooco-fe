'use client'

import DetailUser from '@/src/views/detail-user'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailUser id={params.id} />
}
