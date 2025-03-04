'use client'

import { useState, useEffect } from 'react'
import ListUserPlace from '@/src/features/plan/list-user-place'
import ListUserCourse from '@/src/features/course/list-user-course'
import { Select } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import FloatingWriteButton from '@/src/widgets/floating-write-btn'
import Header from '@/src/widgets/header'
import type { UserProfileType } from '@/src/entities/user/type'
import TabButton from '@/src/features/user/user-tab-button'
import {
  useGetUserCourses,
  COURSE_QUERY_KEY,
} from '@/src/entities/course/query'
import { useQueryClient } from '@tanstack/react-query'
import UserProfileSection from '@/src/features/user/user-profile-section'

interface DetailUserProps {
  id: string
  user: UserProfileType | undefined
  isMe: boolean
}

const LIST_TYPE = {
  place: 'place',
  course: 'course',
} as const

type ListType = keyof typeof LIST_TYPE

export default function DetailUser({ id, user, isMe }: DetailUserProps) {
  const [type, setType] = useState<ListType>(LIST_TYPE.course)
  const [order, setOrder] = useState<'recent' | 'popular'>('recent')
  const queryClient = useQueryClient()
  const { data: courses } = useGetUserCourses(id, order)

  const onChangeOrder = (value: 'recent' | 'popular') => {
    setOrder(value)
  }

  useEffect(() => {
    queryClient.refetchQueries({
      queryKey: COURSE_QUERY_KEY.userCourses(id, order),
    })
  }, [order])

  return (
    <>
      <Header title={isMe ? '마이 페이지' : user?.name || ''} isBack />
      <Spacer height={8} />
      <UserProfileSection user={user} />
      <div className='sticky top-0 bg-white z-10 flex items-center pt-[10px] pb-[5px]'>
        <TabButton
          isActive={type === LIST_TYPE.course}
          onClick={() => setType(LIST_TYPE.course)}
        >
          {isMe ? '나의 코스' : `${user?.name}님의 코스`}
        </TabButton>
        <TabButton
          isActive={type === LIST_TYPE.place}
          onClick={() => setType(LIST_TYPE.place)}
        >
          장소 리뷰
        </TabButton>
      </div>
      <Spacer height={10} />
      <div className='flex px-[20px] justify-between'>
        <div className='flex gap-[5px] text-main font-bold items-center' />
        {type === LIST_TYPE.course && (
          <Select
            defaultValue='recent'
            style={{ width: 80 }}
            onChange={(value) => onChangeOrder(value as 'recent' | 'popular')}
            size='small'
            options={[
              { value: 'recent', label: '최신순' },
              { value: 'popular', label: '인기순' },
            ]}
          />
        )}
      </div>
      {type === LIST_TYPE.place ? (
        <ListUserPlace />
      ) : (
        <>
          <Spacer height={10} />
          <Spacer height={8} className='bg-bright-gray' />
          <ListUserCourse courses={courses || []} />
        </>
      )}
      <Spacer height={20} />
      <FloatingWriteButton />
    </>
  )
}
