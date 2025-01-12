import PageListComment from '@/src/views/detail-comment'
import { getCourse } from '@/src/entities/course/api'

export default async function Page({ params }: { params: { id: number } }) {
  const course = await getCourse(params.id)

  return (
    <PageListComment
      courseId={params.id}
      comments={course.comments_info.comments}
    />
  )
}
