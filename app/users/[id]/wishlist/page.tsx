import ListLikeCourse from '@/src/views/list-like-course'

export default async function Page({ params }: { params: { id: string } }) {
  return <ListLikeCourse id={params.id} />
}
