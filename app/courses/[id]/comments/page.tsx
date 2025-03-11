import PageListComment from '@/src/views/detail-comment'

export default function Page({ params }: { params: { id: string } }) {
  return <PageListComment courseId={params.id} />
}
