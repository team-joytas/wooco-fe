import SectionAnnouncement from '@/src/features/main/section-announcement'
import SectionEvent from '@/src/features/main/section-event'
import SectionBanner from '@/src/features/main/section-banner'
import SectionNewCourse from '@/src/features/main/section-new-course'
import SectionLikeCourse from '@/src/features/main/section-like-course'
import Spacer from '@/src/shared/ui/Spacer'
import SectionBottom from '@/src/features/main/section-bottom'

export default function Main() {
  return (
    <div className='flex items-center flex-col h-[calc(100%-60px)]'>
      <SectionBanner.Course />
      <SectionNewCourse />
      <Spacer className='bg-light-gray' height={8} />
      <SectionLikeCourse />
      <SectionBanner.News />
      <SectionEvent />
      <Spacer className='bg-light-gray' height={8} />
      <SectionAnnouncement />
      <SectionBottom />
    </div>
  )
}
