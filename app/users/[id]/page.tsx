'use client'

import DetailUser from '@/src/views/detail-user'
import useUserStore from '@/src/shared/store/userStore'
import { useRouter } from 'next/navigation'
import { useGetUser } from '@/src/entities/user/query'

export default function Page({ params }: { params: { id: string } }) {
  const myId = useUserStore((state) => state.user?.user_id)
  const isMe = myId !== undefined && myId === params.id
  const router = useRouter()

  const { data: user, error } = useGetUser(params.id)
  if (error) {
    router.push('/not-found')
  }

  return <DetailUser id={params.id} user={user} isMe={isMe} />
}
