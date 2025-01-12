import DetailUser from '@/src/views/detail-user'
import getData from './getData'

export default function Page() {
  const data = getData()
  return <DetailUser data={data} />
}
