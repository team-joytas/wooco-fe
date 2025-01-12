import DetailUser from '@/src/views/detail-user'
import { getUser } from '@/src/entities/user/api'

export default async function Page() {
  const user = await getUser(1)

  return <DetailUser user={user} />
}
