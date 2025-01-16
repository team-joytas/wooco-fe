import DetailUser from '@/src/views/detail-user'
import { getMockupUser } from '@/src/entities/user/api'

export default async function Page() {
  const user = await getMockupUser(1)

  return <DetailUser user={user} />
}
