'use client'

import { useState } from 'react'
import ListUserPlace from '@/src/features/plan/list-user-place'
import ListUserCourse from '@/src/features/course/list-user-course'
import { Spacer } from '@/src/shared/ui'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import Header from '@/src/widgets/header'
import {
  useGetMyPlaceReviews,
  useGetUserSummary,
  useGetUserCourses,
} from '@/src/entities/user'
import UserProfileSection from '@/src/features/user/user-profile-section'
import useUserStore from '@/src/shared/store/userStore'
import { useRouter } from 'next/navigation'
import { NavigationTabs, NavigationTabType, SelectSort } from '@/src/features'

export default function DetailUser({ id }: { id: string }) {
  const router = useRouter()
  const myId = useUserStore((state) => state.user?.user_id)
  const isMe = myId !== undefined && myId === id
  const [activeTab, setActiveTab] = useState<NavigationTabType>('course')
  const [order, setOrder] = useState<'RECENT' | 'POPULAR'>('RECENT')

  const { data: userSummary, error } = useGetUserSummary(id)
  const { data: courses } = useGetUserCourses(id)
  const { data: placeReviews } = useGetMyPlaceReviews(id)

  if (error) {
    router.push('/not-found')
  }

  const tabs = [
    {
      label: isMe
        ? '나의 코스' + ` (${userSummary?.course_count})`
        : `${userSummary?.name}님의 코스` + ` (${userSummary?.course_count})`,
      isActive: activeTab === 'course',
      onClick: () => setActiveTab('course'),
    },
    {
      label: `장소 리뷰 (${userSummary?.review_count})`,
      isActive: activeTab === 'place',
      onClick: () => setActiveTab('place'),
    },
  ]

  if (error) {
    router.push('/not-found')
  }

  if (!userSummary || !courses || !placeReviews) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Header title={isMe ? '마이 페이지' : userSummary.name} isBack />
      <Spacer height={8} />

      <UserProfileSection user={userSummary} />
      <NavigationTabs tabs={tabs} />

      <Spacer height={10} />

      <div className='w-full flex flex-col px-[22px] justify-center items-end'>
        {activeTab === 'course' && (
          <SelectSort order={order} setOrder={setOrder} />
        )}
      </div>
      {activeTab === 'place' ? (
        <ListUserPlace reviews={placeReviews} />
      ) : (
        <ListUserCourse courses={courses} />
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
