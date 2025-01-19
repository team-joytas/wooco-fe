'use client'

import Link from 'next/link'
import Spacer from '@/src/shared/ui/Spacer'
import GridCourse from '@/src/features/course/grid-course'
import { CourseType } from '@/src/entities/course/type'
import NoLikedCourse from '@/src/shared/ui/NoLikedCourse'
import { useGetMyProfile } from '@/src/entities/user/query'
import { useGetMyLikeCourse } from '@/src/entities/course/query'

export default function SectionLikeCourse() {
  const { data: user } = useGetMyProfile()

  if (!user)
    return (
      <section className='w-full h-fit py-[22px] border-b-[1px] border-header-line'>
        <div className='px-[20px] flex flex-col items-center justify-center py-8'>
          <p className='text-main font-bold mb-2'>
            로그인하고 나만의 관심 코스를 만들어보세요
          </p>
          <p className='text-sub text-black opacity-50 mb-4'>
            마음에 드는 코스를 저장하고 나만의 코스를 만들 수 있어요
          </p>
          <Link
            href='/login'
            className='px-6 py-2 bg-container-light-blue text-white rounded-full hover:bg-container-blue transition-all'
          >
            로그인하기
          </Link>
        </div>
      </section>
    )

  return (
    <section className='w-full h-fit py-[22px] border-b-[1px] border-header-line'>
      <div className='px-[20px] flex items-center justify-between'>
        <div className='flex flex-col'>
          <p>
            <span className='text-headline text-brand font-bold'>
              {user?.name}
            </span>
            <span className='text-main font-bold'>&nbsp;님의 관심코스</span>
          </p>
          <span className='text-sub text-black opacity-50'>
            관심있는 지역/장소들을 내 코스로 만들어봐요
          </span>
        </div>
        <Link href={`/users/${user?.user_id}/wishlist`}>더보기</Link>
      </div>
      <Spacer height={12} />
      {user?.user_id && <UserLikeCourse id={user?.user_id} />}
    </section>
  )
}

function UserLikeCourse({ id }: { id: string }) {
  const { data: likeCourse } = useGetMyLikeCourse({ id, limit: 4 })

  if (!likeCourse || likeCourse.length === 0) return <NoLikedCourse />

  return (
    <div className='w-full h-fit overflow-x-auto scrollbar-hide py-[10px] px-[20px]'>
      <div className='w-fit flex gap-[22px]'>
        {likeCourse?.map((course: CourseType) => (
          <GridCourse key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
