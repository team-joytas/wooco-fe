import getData from './getData'
import DetailCourse from '@/src/views/detail-course'

export default function Page({ params }: { params: { id: number } }) {
  const data = getData()

  return <DetailCourse courseId={params.id} data={data} />
}
