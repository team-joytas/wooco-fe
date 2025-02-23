'use client'

import Link from 'next/link'
import Spacer from '@/src/shared/ui/Spacer'
import GridCourse from '@/src/features/course/grid-course'
import { CourseType } from '@/src/entities/course/type'
import NoLikedCourse from '@/src/shared/ui/NoLikedCourse'
import { useGetMyProfile } from '@/src/entities/user/query'
import { useGetLikeCourses } from '@/src/entities/course/query'
import { getLoginUrl } from '@/src/entities/login/api'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export default function SectionLikeCourse() {
  const { data: user } = useGetMyProfile()

  if (!user) return <LoginLikeCourse />

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
  const { data: likeCourse } = useGetLikeCourses({ id, limit: 4 })

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

function LoginLikeCourse() {
  const router = useRouter()
  const handleLogin = async () => {
    const loginUrl = await getLoginUrl()
    router.push(loginUrl)
  }
  const mockCourse = {
    id: 1,
    title: '123',
    primary_region: '서울',
    secondary_region: '강남',
    categories: ['FAMOUS_RESTAURANT'],
    contents: '123123',
    visit_date: '2025-01-19',
    views: 19,
    comments: 3,
    likes: 0,
    created_at: '2025-01-19T23:26:24.576487',
    places: [
      {
        order: 0,
        id: 1,
        name: '강남김밥',
        latitude: '37.51647777507762',
        longitude: '127.04264755226313',
        address: '서울 강남구 삼성동 7-3',
        thumbnail_url: '',
        kakao_map_place_id: '18442419',
        average_rating: 0.0,
        review_count: 0,
      },
    ],
    writer: {
      id: '1',
      name: '제뿌뿌',
      profile_url:
        'https://cdn.wooco.kr/667356313676038106/c5df2c12-48ca-4749-81b9-40e91640cff9',
    },
    is_liked: false,
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
            <GridCourse key={index} course={mockCourse as CourseType} />
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
