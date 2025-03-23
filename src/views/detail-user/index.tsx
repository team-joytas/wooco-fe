'use client'

import { useState } from 'react'
import ListUserPlace from '@/src/features/plan/list-user-place'
import ListUserCourse from '@/src/features/course/list-user-course'
import { Select } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import Header from '@/src/widgets/header'
import TabButton from '@/src/features/user/user-tab-button'
import {
  useGetMyPlaceReviews,
  useGetUser,
  useGetUserCourses,
} from '@/src/entities/user'
import UserProfileSection from '@/src/features/user/user-profile-section'
import useUserStore from '@/src/shared/store/userStore'
import { useRouter } from 'next/navigation'

const LIST_TYPE = {
  place: 'place',
  course: 'course',
} as const

type ListType = keyof typeof LIST_TYPE

export default function DetailUser({ id }: { id: string }) {
  const router = useRouter()
  const myId = useUserStore((state) => state.user?.user_id)
  const isMe = myId !== undefined && myId === id
  const [type, setType] = useState<ListType>(LIST_TYPE.course)
  const [order, setOrder] = useState<'RECENT' | 'POPULAR'>('RECENT')

  const { data: user, error } = useGetUser(id)
  if (error) {
    router.push('/not-found')
  }
  const { data: courses } = useGetUserCourses(id, order)
  const { data: placeReviews } = useGetMyPlaceReviews(id)

  const onChangeOrder = (value: 'RECENT' | 'POPULAR') => {
    setOrder(value)
  }

  if (!user || !courses || !placeReviews) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Header title={isMe ? '마이 페이지' : user.name} isBack />
      <Spacer height={8} />
      <UserProfileSection user={user} />
      <div className='sticky top-0 bg-white z-10 flex items-center pt-[10px] pb-[5px]'>
        <TabButton
          isActive={type === LIST_TYPE.course}
          onClick={() => setType(LIST_TYPE.course)}
        >
          {isMe ? '나의 코스' : `${user.name}님의 코스`} ({courses.length})
        </TabButton>
        <TabButton
          isActive={type === LIST_TYPE.place}
          onClick={() => setType(LIST_TYPE.place)}
        >
          장소 리뷰 ({placeReviews.length})
        </TabButton>
      </div>
      <Spacer height={10} />
      <div className='flex px-[20px] justify-between'>
        {type === LIST_TYPE.course && (
          <Select
            defaultValue='RECENT'
            style={{ width: 80 }}
            onChange={(value) => onChangeOrder(value as 'RECENT' | 'POPULAR')}
            size='small'
            options={[
              { value: 'RECENT', label: '최신순' },
              { value: 'POPULAR', label: '인기순' },
            ]}
          />
        )}
      </div>
      {type === LIST_TYPE.place ? (
        <ListUserPlace reviews={placeReviews} />
      ) : (
        <ListUserCourse courses={courses} />
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
