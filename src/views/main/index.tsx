import { Spacer } from '@/src/shared/ui'
import {
  SectionAnnouncement,
  SectionBanner,
  SectionNewCourse,
  SectionLikeCourse,
  SectionBottom,
} from '@/src/features'

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
