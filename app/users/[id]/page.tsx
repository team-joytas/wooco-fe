'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spacer } from '@/src/shared/ui'
import { ActionHeader } from '@/src/widgets'
import {
  useMyPlaceReviews,
  useUserSummary,
  useUserCourses,
  UserProfileSection,
  UserProfileSectionSkeleton,
} from '@/src/entities/user'
import useUserStore from '@/src/shared/store/userStore'
import {
  NavigationTabs,
  NavigationTabType,
  TabSkeleton,
  PlaceReviewList,
  CourseList,
  CoursePlanCardSkeleton,
  FloatingWriteButton,
} from '@/src/features'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const myId = useUserStore((state) => state.user?.user_id)
  const isMe = myId !== undefined && myId === id
  const [activeTab, setActiveTab] = useState<NavigationTabType>('course')

  const { data: userSummary, error } = useUserSummary(id)
  const { data: courses } = useUserCourses(id)
  const { data: placeReviews } = useMyPlaceReviews(id)

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
    return (
      <>
        <ActionHeader title={isMe ? '마이 페이지' : ''} isBack />
        <Spacer height={8} />
        <UserProfileSectionSkeleton />
        <TabSkeleton />
        <Spacer height={10} />
        <div className='flex flex-col gap-[20px] px-[20px] mt-[20px]'>
          {Array.from({ length: 5 }).map((_, index) => (
            <CoursePlanCardSkeleton key={index} />
          ))}
        </div>
        <Spacer height={20} />
        <FloatingWriteButton />
      </>
    )
  }

  return (
    <>
      <ActionHeader title={isMe ? '마이 페이지' : userSummary.name} isBack />
      <Spacer height={8} />

      <UserProfileSection user={userSummary} />
      <NavigationTabs tabs={tabs} />

      <Spacer height={10} />
      {activeTab === 'place' ? (
        <PlaceReviewList reviews={placeReviews} />
      ) : (
        <CourseList courses={courses} />
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
