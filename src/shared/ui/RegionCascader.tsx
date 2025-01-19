'use client'

import { Cascader } from 'antd'
import { getSeoulData } from '@/src/entities/place/api'
import { DefaultOptionType } from 'antd/es/cascader'

interface CascaderProps {
  firstRegion: string
  secondRegion: string
  placeholder: string
  setRegion: (value: string[]) => void
}

export default function RegionCascader({
  firstRegion,
  secondRegion,
  placeholder,
  setRegion,
}: CascaderProps) {
  const options = getSeoulData()

  const onChange = (value: (string | number | null)[]) => {
    if (value) setRegion(value as string[])
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    )

  return (
    <Cascader
      options={options}
      value={
        firstRegion && secondRegion ? [firstRegion, secondRegion] : undefined
      }
      placeholder={placeholder}
      onChange={onChange}
      size='large'
      showSearch={{ filter }}
      style={{
        width: '100%',
      }}
      expandTrigger='hover'
    />
  )
}
