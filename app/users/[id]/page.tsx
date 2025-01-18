'use client'

import DetailUser from '@/src/views/detail-user'
import { getUser } from '@/src/entities/user/api'
import useUserStore from '@/src/shared/store/userStore'
import { useEffect, useState } from 'react'
import type { UserProfileType } from '@/src/entities/user/type'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserProfileType>()
  const myId = useUserStore((state) => state.user?.user_id)
  const isMe = myId !== undefined && myId === params.id
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(params.id)
        setUser(user)
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          router.push('/not-found')
        }
      }
    }
    fetchUser()
  }, [params.id])

  return <DetailUser user={user} isMe={isMe} />
}
