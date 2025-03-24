'use client'

import Link from 'next/link'
import Spacer from '@/src/shared/ui/Spacer'
import { CourseGridCard } from '../course-plan-card'
import { CourseType, mockCourse } from '@/src/entities/course'
import NoLikedCourse from '@/src/shared/ui/NoLikedCourse'
import { useGetMyProfile, useGetLikeCourses } from '@/src/entities/user'
import { getLoginUrl } from '@/src/entities/auth'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function SectionLikeCourse() {
  const { data: user } = useGetMyProfile()

  if (!user) return <LoginLikeCourse />

  return (
    <section className='w-full h-fit py-[22px] border-b-[1px] border-container-blue'>
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
        <Link
          href={`/users/${user?.user_id}/wishlist`}
          className='text-[10px] text-black opacity-50'
        >
          더보기
        </Link>
      </div>
      <Spacer height={12} />
      {user?.user_id && <UserLikeCourse id={user?.user_id} />}
    </section>
  )
}

function UserLikeCourse({ id }: { id: string }) {
  const { data: likeCourse } = useGetLikeCourses({ id, limit: 4 })

  if (!likeCourse || likeCourse.length === 0) return <NoLikedCourse />

  return (
    <div className='w-full h-fit overflow-x-auto scrollbar-hide py-[10px] px-[20px]'>
      <div className='w-fit flex gap-[22px]'>
        {likeCourse?.map((course: CourseType) => (
          <CourseGridCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

function LoginLikeCourse() {
  const router = useRouter()
  const handleLogin = async () => {
    const loginUrl = await getLoginUrl()
    router.push(loginUrl)
  }

  return (
    <section className='relative w-full h-fit py-[22px] border-b-[1px] border-header-line'>
      <div className='px-[20px] flex items-center justify-between'>
        <div className='flex flex-col'>
          <p>
            <span className='text-headline text-brand font-bold'>우코코</span>
            <span className='text-main font-bold'>&nbsp;님의 관심코스</span>
          </p>
          <span className='text-sub text-black opacity-50'>
            관심있는 지역/장소들을 내 코스로 만들어봐요
          </span>
        </div>
      </div>
      <Spacer height={12} />
      <div className='w-full h-fit overflow-hidden py-[10px] px-[20px]'>
        <div className='w-fit flex gap-[22px]'>
          {Array.from({ length: 2 }).map((_, index) => (
            <CourseGridCard key={index} course={mockCourse as CourseType} />
          ))}
        </div>
      </div>
      <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center bg-white/60 backdrop-blur'>
        <div className='px-[35px] py-[30px] flex flex-col items-center justify-center'>
          <p className='text-main text-brand font-bold text-center'>
            로그인하고
            <br />
            나만의 관심 코스 만들어보세요!
          </p>
          <Spacer height={30} />
          <button
            className='h-[32px] w-[186px] font-extrabold cursor-pointer text-search-gray flex flex-row items-center justify-center '
            onClick={handleLogin}
          >
            <span className='text-kakao'>카카오</span>
            로 시작하기
            <ChevronRight className='ml-[5px]' size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
