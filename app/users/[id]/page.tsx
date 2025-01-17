import DetailUser from '@/src/views/detail-user'
import { getUser } from '@/src/entities/user/api'

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(Number(params.id))

  return <DetailUser user={user} />
}
