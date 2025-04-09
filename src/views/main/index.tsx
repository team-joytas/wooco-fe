import SectionBanner from '@/src/features/main/section-banner'
import SectionNewCourse from '@/src/features/main/section-new-course'
import SectionLikeCourse from '@/src/features/main/section-like-course'
import { Spacer } from '@/src/shared/ui'
import SectionBottom from '@/src/features/main/section-bottom'
import SectionAnnouncement from '@/src/features/main/section-announcement'

export default function Main() {
  return (
    <div className='flex items-center flex-col h-[calc(100%-60px)]'>
      <SectionBanner.Course />
      <SectionNewCourse />
      <Spacer className='bg-light-gray' height={8} />
      <SectionLikeCourse />
      <SectionBanner.News />
      <SectionAnnouncement />
      <SectionBottom />
    </div>
  )
}

/* TODO: 공지사항, 이벤트 API 완료 시 추가
function ArchiveMain() {
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
*/
