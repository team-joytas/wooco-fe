import type { UserProfileType } from '@/src/entities/user/type'
import ProfileImage from '@/src/shared/ui/ProfileImage'
import UserTag from '@/src/features/user/user-tag'

export default function UserProfileSection({
  user,
}: {
  user: UserProfileType | undefined
}) {
  return (
    <section className='px-[20px] py-[10px] gap-[5px] w-full flex flex-col justify-between'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col justify-center items-start gap-[10px]'>
          <ProfileImage
            size={60}
            src={user?.profile_url || ''}
            type='colored'
          />
          <p className='font-bold text-brand text-headline'>{user?.name}</p>
        </div>
        <div className='flex gap-[30px] items-end'>
          <UserTag type='heart' content={'?'} />
          <UserTag type='comment' content={'?'} />
          <UserTag type='rate' content={'?'} />
        </div>
      </div>
      <span className='text-sub font-light'>{user?.description}</span>
    </section>
  )
}
