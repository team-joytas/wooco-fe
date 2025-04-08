import { Select } from 'antd'
import { selectOptions } from './options'

interface SelectSortProps {
  order: 'RECENT' | 'POPULAR'
  setOrder: (order: 'RECENT' | 'POPULAR') => void
}

export function SelectSort({ order, setOrder }: SelectSortProps) {
  return (
    <Select
      defaultValue='RECENT'
      style={{ width: 80 }}
      value={order}
      onChange={(value) => setOrder(value as 'RECENT' | 'POPULAR')}
      size={'small'}
      options={selectOptions}
    />
  )
}
