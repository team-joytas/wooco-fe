import ImageWithIndex from '@components/(course)/ImageWithIndex'
import ProfileImage from '@components/ProfileImage'
import Image from 'next/image'
import share from '@images/share.png'
import heart_color from '@images/heart_color.png'
import comment from '@images/comment.png'
import Spacer from '@/app/components/(layout)/Spacer'

interface TrendingProps {
  id: number
  createdAt: string
  profileImage: string
  userName: string
  title: string
  content: string
  places: PlaceProps[]
  likes: number
  comments: number
}

interface PlaceProps {
  id: number
  image: string
}

export default function TrendingCourse({ course }: { course: TrendingProps }) {
  return (
    <div key={course.id} className='w-full flex flex-col gap-[8px]'>
      <span className='text-description text-[10px]'>{course.createdAt}</span>
      <div className='flex flex-row justify-center items-start gap-[8px]'>
        <ProfileImage
          size={32}
          src={course.profileImage}
          className='border-brand'
        />
        <div className='flex flex-col'>
          <span className='text-[13px] font-semibold text-brand'>
            {course.userName}
          </span>
          <span className='text-[16px] font-bold'>{course.title}</span>
          <span className='text-[11px] h-[26px] word-wrap'>
            {course.content}
          </span>

          <Spacer height={20} />

          <div className='flex flex-row w-[300px] justify-start overflow-x-auto scrollbar-hide'>
            <span className='w-[28px] text-[10px] text-description word-break leading-[12px] flex-shrink-0'>
              추천 코스
            </span>
            {course.places.map((place) => (
              <ImageWithIndex
                key={place.id}
                src={place.image}
                index={place.id}
              />
            ))}
          </div>

          <Spacer height={20} />

          <div className='flex flex-row justify-between items-center'>
            <div className='flex items-center gap-[10px]'>
              <div className='flex items-center gap-[4px]'>
                <Image src={heart_color} width={20} height={20} alt='like' />
                <span>25</span>
              </div>
              <div className='flex items-center gap-[4px]'>
                <Image src={comment} width={20} height={20} alt='comment' />
                <span>03</span>
              </div>
            </div>

            <Image
              alt='share'
              src={share}
              width={16}
              height={16}
              className='cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
