import type { UserSummaryType } from '@/src/entities/user'
import { ProfileImage } from '@/src/shared/ui'
import logo from '@/src/assets/images/(logo)/logo.png'
import { Heart, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function UserProfileSection({ user }: { user: UserSummaryType }) {
  const { user_id, profile_url, name, description, like_course_count } = user

  return (
    <section className='h-[127px] p-[10px] gap-[10px] w-full flex flex-col'>
      <div className='flex flex-row items-center justify-start gap-[16px]'>
        <div className='flex justify-center items-start gap-[10px]'>
          <ProfileImage size={60} src={profile_url || logo} userId={user_id} />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <p className='font-bold text-brand text-headline'>{name}</p>
          <p className='text-middle font-medium'>{description}</p>
        </div>
      </div>
      <Link
        href={`${user_id}/wishlist`}
        className='flex flex-row px-[10px] py-[13px] items-center justify-between w-[346px] h-[50px] rounded-[10px] bg-light-gray'
      >
        <p className='text-middle font-medium'>관심 코스 목록</p>
        <div className='flex flex-row justify-center items-center gap-[6px]'>
          <div className='flex flex-row gap-[4px]'>
            <Heart className='fill-brand stroke-0 mt-[1.5px]' size={20} />
            {like_course_count}
          </div>
          <ChevronRight className='text-description' size={24} />
        </div>
      </Link>
    </section>
  )
}
