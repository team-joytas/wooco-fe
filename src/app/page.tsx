import NoticeSection from './components/(main)/NoticeSection'
import EventSection from './components/(main)/EventSection'
import BannerSection from './components/(main)/BannerSection'
import NewCourseSection from './components/(main)/NewCourseSection'
import LikeCourseSection from './components/(main)/LikeCourseSection'
import Spacer from './components/Spacer'
import BottomSection from './components/(main)/BottomSection'

export default function Page() {
  return (
    <div className='flex items-center flex-col h-[calc(100%-60px)]'>
      <BannerSection.Course />
      <NewCourseSection />
      <Spacer className='bg-light-gray' height={8} />
      <LikeCourseSection />
      <BannerSection.News />
      <EventSection />
      <Spacer className='bg-light-gray' height={8} />
      <NoticeSection />
      <BottomSection />
    </div>
  )
}
