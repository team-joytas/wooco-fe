import PageListComment from '@/src/views/list-comment'

export default function Page({ params }: { params: { id: string } }) {
  return <PageListComment courseId={params.id} />
}
