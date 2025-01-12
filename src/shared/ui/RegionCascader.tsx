'use client'

import { Cascader } from 'antd'
import { getSeoulData } from '@/src/entities/place/api'
import { DefaultOptionType } from 'antd/es/cascader'
import { useState, useEffect } from 'react'
import { SeoulType } from '@/src/entities/place/type'

interface CascaderProps {
  placeholder: string
  setSelectedRegion: (value: string) => void
}

export default function RegionCascader({
  placeholder,
  setSelectedRegion,
}: CascaderProps) {
  const [data, setData] = useState<SeoulType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeoulData()
      setData(data)
    }
    fetchData()
  }, [])

  const onChange = (value: (string | number | null)[]) => {
    if (value) setSelectedRegion(value[1] as string)
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
      options={data}
      placeholder={placeholder}
      onChange={onChange}
      size='large'
      showSearch={{ filter }}
      style={{
        width: '300px',
      }}
      expandTrigger='hover'
    />
  )
}
