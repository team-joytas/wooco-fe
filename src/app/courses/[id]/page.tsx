import left from '@images/left.png'
import Spacer from '@/app/components/Spacer'
import Image from 'next/image'
import ProfileImage from '@/app/components/ProfileImage'
import getData from './getData'
import PlaceCollapse from './components/PlaceCollapse'
import CommentComponent from './components/CommentComponent'

export default function Page({ params }: { params: { id: number } }) {
  const courseId = params.id
  const data = getData()
  const dateType = data.pass_from_create.type === 'date' ? '일 전' : '시간 전'

  return (
    <div className='w-full pt-[20px] pb-[32px] px-[16px] flex flex-col'>
      <section className='justify-between items-center flex'>
        <Image
          alt='go back'
          src={left}
          width={24}
          height={24}
          className='w-[24px] h-[24px]'
        />
        <p className='border-b font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue'>
          {data.name}
        </p>
        <div className='w-[20px] h-[20px]' />
      </section>
      <Spacer height={25} />
      <section className='w-full flex gap-[10px]'>
        <div className='w-[42px] h-[42px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
          <ProfileImage src={data.user.profile_url} size={40} />
        </div>
        <div className='flex flex-col gap-[2px]'>
          <span className='font-semibold text-[14px]'>{data.user.name}</span>
          <div className='text-[13px] flex gap-[5px]'>
            <span>
              {data.pass_from_create.number}
              {dateType}
            </span>
            <span>{data.created_at}</span>
          </div>
        </div>
      </section>
      <section className='w-full mt-[15px] items-center flex gap-[10px]'>
        <span className='text-[12px]'>카테고리</span>
        {data.categories.map((category, index) => {
          return (
            <span
              key={index}
              className='px-[10px] py-[5px] text-[12px] border rounded-[15px]'
            >
              #{category}
            </span>
          )
        })}
      </section>
      <div className='mt-[15px] mb-[15px] h-[2px] bg-light-gray' />
      <section className='flex flex-col text-[15px]'>
        {data.user.name}님의 {data.name}에 대한 리뷰에요!
        <span className='text-[13px] mt-[10px]'>{data.content}</span>
      </section>
      <section className='flex flex-col mt-[20px] text-[15px]'>
        장소 정보
        <div className='mt-[10px] h-[180px] bg-light-gray' />
      </section>
      <section className='flex flex-col mt-[20px] text-[15px]'>
        장소 리뷰
        <PlaceCollapse />
      </section>
      <div className='mt-[15px] mb-[15px] h-[2px] bg-light-gray' />
      <CommentComponent
        courseId={courseId}
        isLike={data.user.isLike}
        likes={data.likes}
        comments={data.comments_info}
      />
    </div>
  )
}
