import getData from '../getData'
import PageListComment from '@/src/views/detail-comment'

export default function Page({ params }: { params: { id: number } }) {
  const comments = getData().comments_info.comments

  return <PageListComment courseId={params.id} comments={comments} />
}
