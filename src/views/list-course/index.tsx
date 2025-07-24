import { useSearchParams } from 'next/navigation'
import MainCourse from './MainCourse'
import RegionCourse from './RegionCourse'

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
