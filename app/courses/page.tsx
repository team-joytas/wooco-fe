import { getTrendingCourses } from '@/src/entities/course/api'
import { getFavoriteRegions } from '@/src/entities/user/api'
import CourseList from '@/src/views/list-course'

export default async function Page() {
  const trendingCourses = await getTrendingCourses()
  const favoriteRegions = await getFavoriteRegions()

  return (
    <CourseList
      trendingCourses={trendingCourses}
      favoriteRegions={favoriteRegions}
    />
  )
}
