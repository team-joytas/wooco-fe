'use client'

import { Cascader } from 'antd'
import { getSeoulData } from '@/src/entities/place'
import { DefaultOptionType } from 'antd/es/cascader'
import { useMemo } from 'react'
import { UserLikeRegionType } from '@/src/entities/user'

interface CascaderProps {
  firstRegion: string
  secondRegion: string
  placeholder: string
  setRegion: (value: string[]) => void
}

interface LikeCascaderProps {
  placeholder: string
  setRegion: (value: string[]) => void
  likedRegions: UserLikeRegionType[]
  clickable: boolean
}

export function RegionCascader({
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
      style={{ width: '100%' }}
      expandTrigger='hover'
    />
  )
}

export function RegionCascaderWithLikes({
  placeholder,
  setRegion,
  likedRegions,
  clickable,
}: LikeCascaderProps) {
  const seoulData = getSeoulData()
  const likedRegionOptions = transformLikedRegions(likedRegions)

  const options = useMemo(() => {
    return [...seoulData, ...likedRegionOptions]
  }, [seoulData, likedRegionOptions])

  const onChange = (value: (string | number | null)[]) => {
    const selectedValue = value as string[]
    const trimmedValue = selectedValue.map((val) =>
      typeof val === 'string' ? val.trim() : val
    )

    setRegion(trimmedValue)
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    )

  return (
    <div className='w-full px-[10px]'>
      <Cascader
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        size='large'
        showSearch={{ filter }}
        style={{ width: '100%' }}
        expandTrigger='hover'
        {...(!clickable ? { disabled: true } : {})}
      />
    </div>
  )
}

function transformLikedRegions(
  likedRegions: UserLikeRegionType[]
): DefaultOptionType[] {
  return [
    {
      value: '서울 ',
      label: '관심 지역',
      disabled: likedRegions.length === 0,
      children: likedRegions.map((region) => ({
        value: region.secondary_region,
        label: `${region.secondary_region}구`,
      })),
    },
  ]
}
