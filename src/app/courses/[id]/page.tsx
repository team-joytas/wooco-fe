import back from '@images/arrow_left.png'
import toggle from '@images/toggle.png'
import Image from 'next/image'
import ProfileImage from '@/app/components/ProfileImage'
import getData from './getData'
import PlaceCollapse from './components/PlaceCollapse'
import CommentComponent from './components/CommentComponent'

export default function Page({ params }: { params: { id: number } }) {
  const courseId = params.id
  const data = getData()
  return (
    <div className='w-full pt-[20px] pb-[32px] px-[16px] flex flex-col'>
      <section className='justify-between items-center flex'>
        <Image
          alt='back'
          src={back}
          width={20}
          height={10}
          className='w-[20px] h-[18px]'
        />
        <p className='border-b font-semibold text-[18px]'>{data.name}</p>
        <Image alt='toggle' src={toggle} width={20} height={20} />
      </section>
      <section className='w-full flex mt-[20px] gap-[10px]'>
        <ProfileImage src={data.user.profile_url} size={43} />
        <div className='flex flex-col gap-[2px]'>
          <span className='font-semibold text-[14px]'>{data.user.name}</span>
          <span className='text-[13px]'>{data.created_at}</span>
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
      <div className='mt-[15px] mb-[15px] h-[2px] bg-gray-100' />
      <section className='flex flex-col text-[15px]'>
        {data.user.name}님의 {data.name}에 대한 리뷰에요!
        <span className='text-[13px] mt-[10px]'>{data.content}</span>
      </section>
      <section className='flex flex-col mt-[20px] text-[15px]'>
        장소 정보
        <div className='mt-[10px] h-[180px] bg-gray-100' />
      </section>
      <section className='flex flex-col mt-[20px] text-[15px]'>
        장소 리뷰
        <PlaceCollapse />
      </section>
      <div className='mt-[15px] mb-[15px] h-[2px] bg-gray-100' />
      <CommentComponent
        courseId={courseId}
        isLike={data.user.isLike}
        likes={data.likes}
        comments={data.comments_info}
      />
    </div>
  )
}
