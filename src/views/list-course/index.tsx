import { useSearchParams } from 'next/navigation'
import MainCourse from './main-course'
import RegionCourse from './region-course'

export default function ListCourse() {
  const path = useSearchParams()
  const primary = path.get('primary')
  const secondary = path.get('secondary')

  if (!primary || !secondary) {
    return <MainCourse />
  } else {
    return <RegionCourse primary={primary} secondary={secondary} />
  }
}
