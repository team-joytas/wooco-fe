import getData from './getData'
import CoursePlanLayout from '@components/(course)/CoursePlanLayout'
import ProfileImage from '@components/ProfileImage'
import CommentComponent from './components/CommentComponent'
import Spacer from '@components/(layout)/Spacer'

export default function Page({ params }: { params: { id: number } }) {
  const courseId = params.id
  const data = getData()
  const dateType = data.pass_from_create.type === 'date' ? '일 전' : '시간 전'

  return (
    <CoursePlanLayout type='course' id={courseId}>
      <section className='w-full px-[30px] py-[10px] text-white bg-brand'>
        <div className='w-full flex gap-[10px] max-w-[375px]'>
          <ProfileImage src={data.user.profile_url} size={40} type='colored' />
          <div className='flex flex-col gap-[2px]'>
            <span className='font-semibold text-[14px]'>{data.user.name}</span>
            <div className='text-[13px] flex gap-[5px]'>
              <span className='text-sub font-semibold'>
                {data.pass_from_create.number}
                {dateType}
              </span>
              <span className='text-sub opacity-50'>{data.created_at}</span>
            </div>
          </div>
        </div>
      </section>
      <Spacer height={10} className='bg-container-light-blue' />
      <Spacer height={20} />
      <CommentComponent
        courseId={courseId}
        isLike={data.user.isLike}
        likes={data.likes}
        comments={data.comments_info}
      />
    </CoursePlanLayout>
  )
}
