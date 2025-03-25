import type { UserProfileType } from '@/src/entities/user'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import { Heart, ChevronRight } from 'lucide-react'

export default function UserProfileSection({
  user,
}: {
  user: UserProfileType | undefined
}) {
  // TODO: 매직 넘버 API 연결로 대체 예정
  const COUNT_PREFERENCE_COURSES = 23

  return (
    <section className='p-2.5 gap-[6px] w-full flex flex-col justify-between'>
      <div className='flex flex-row items-center justify-start gap-[16px]'>
        <div className='flex justify-center items-start gap-[10px]'>
          <ProfileImage
            size={60}
            src={user?.profile_url || '/profile.png'}
            userId={user?.user_id || ''}
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <p className='font-bold text-brand text-headline'>{user?.name}</p>
          <p className='text-middle font-medium'>{user?.description}</p>
        </div>
      </div>
      <div className='flex flex-row px-[10px] py-[13px] items-center justify-between w-[346px] h-[50px] rounded-[10px] bg-light-gray'>
        <p className='text-middle font-medium'>관심 코스 목록</p>
        <div className='flex flex-row justify-center items-center gap-[6px]'>
          <div className='flex flex-row gap-[4px]'>
            <Heart className='fill-brand stroke-0 mt-[1.5px]' size={20} />
            {COUNT_PREFERENCE_COURSES}
          </div>
          <ChevronRight className='text-description' size={24} />
        </div>
      </div>
    </section>
  )
}
