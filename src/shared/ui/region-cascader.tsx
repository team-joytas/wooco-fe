'use client'

import { getSeoulData } from '@/src/entities/place'
import React, { useMemo, useState } from 'react'
import { UserLikeRegionType } from '@/src/entities/user'
import right from '@/src/assets/icon/medium/right.svg'
import search from '@/src/assets/icon/medium/search.svg'
import Image from 'next/image'

interface CascaderProps {
  firstRegion: string
  secondRegion: string
  placeholder: string
  setRegion: (value: string[]) => void
  clickable?: boolean
}

interface LikeCascaderProps {
  placeholder: string
  setRegion: (value: string[]) => void
  likedRegions: UserLikeRegionType[]
  clickable: boolean
}

interface RegionCascaderProps {
  value: string
  label: string
  disabled?: boolean
  children: {
    value: string
    label: string
  }[]
}
export function RegionCascader({
  firstRegion,
  secondRegion,
  placeholder,
  setRegion,
  clickable = true,
}: CascaderProps) {
  const options = getSeoulData()

  return (
    <RegionCascaderBase
      options={options}
      placeholder={
        firstRegion && secondRegion
          ? firstRegion + '시 ' + secondRegion + '구'
          : placeholder
      }
      setRegion={setRegion}
      clickable={clickable}
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

  const options: RegionCascaderProps[] = useMemo(() => {
    return [...seoulData, ...likedRegionOptions]
  }, [seoulData, likedRegionOptions])

  return (
    <RegionCascaderBase
      options={options}
      placeholder={placeholder}
      setRegion={setRegion}
      clickable={clickable}
    />
  )
}

function transformLikedRegions(
  likedRegions: UserLikeRegionType[]
): RegionCascaderProps[] {
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

interface RegionCascaderBaseProps {
  placeholder: string
  setRegion: (value: string[]) => void
  options: RegionCascaderProps[]
  clickable: boolean
}

export function RegionCascaderBase({
  placeholder,
  setRegion,
  options,
  clickable = true,
}: RegionCascaderBaseProps) {
  const [showCascader, setShowCascader] = useState(false)

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const currentChildren = useMemo(() => {
    return options[focusedOptionIndex]?.children || []
  }, [options, focusedOptionIndex])
  const handleOptionHover = (index: number) => {
    setFocusedOptionIndex(index)
  }

  const [selectedRegion, setSelectedRegion] = useState(placeholder)
  const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!clickable) return
    setSelectedRegion(
      options[focusedOptionIndex].value + '시 ' + e.currentTarget.title + '구'
    )
    setShowCascader(false)
    setFocusedOptionIndex(-1)
    setRegion([options[focusedOptionIndex].value, e.currentTarget.title])
  }

  return (
    <div className='w-full px-[10px] flex flex-col items-center relative'>
      <div
        className='w-[339px] h-[40px] rounded-[99px] px-[15px] relative flex justify-start items-center border-wooco_blue-primary border-[1.5px] cursor-pointer'
        onClick={() => {
          if (!clickable) return
          setShowCascader(!showCascader)
        }}
      >
        <span className='text-sub02 text-gray-600 font-light'>
          {selectedRegion}
        </span>
        <Image
          src={search}
          alt='search'
          width={16}
          height={16}
          className='absolute right-[10px]'
        />
      </div>

      <section
        className={`w-[327px] absolute top-[50px] z-[1] ${showCascader ? ' scale-y-100 ' : 'scale-y-0'} transition-all duration-100`}
        onMouseLeave={() => {
          setShowCascader(false)
          setFocusedOptionIndex(-1)
        }}
      >
        <div
          className={`w-[110px] h-[180px] p-2 border-r-[1px] bg-white border-gray-100 ${focusedOptionIndex === -1 && 'shadow-grid'} rounded-[10px] z-[2] absolute flex flex-col justify-start items-center gap-[6px]`}
        >
          {options.map((option, index) => (
            <div
              className={`
            w-[102px] h-[34px] rounded-[6px] flex items-center relative transition-colors
            ${option?.disabled == true && 'opacity-50 cursor-not-allowed'} 
            ${focusedOptionIndex === index ? 'bg-wooco_blue-primary-light text-white' : 'text-gray-700'}
            `}
              onMouseEnter={() => handleOptionHover(index)}
              key={option.value}
            >
              <span className='text-sub01 font-semibold absolute left-[20px]'>
                {option.label}
              </span>
              <Image
                src={right}
                alt='right arrow'
                width={16}
                height={16}
                className='absolute right-[10px] transition-all group-hover:filter group-hover:brightness-50]'
              />
            </div>
          ))}
        </div>
        {focusedOptionIndex !== -1 && (
          <div className='w-[327px] h-[180px] bg-white shadow-grid rounded-[10px] z-[1] absolute pl-[120px] flex flex-col justify-center items-start '>
            <div className='h-[160px] overflow-y-auto'>
              <div className='flex flex-col items-start gap-[4px]'>
                {currentChildren.map(
                  (option: { value: string; label: string }) => (
                    <span
                      className='text-sub01 font-semibold px-[15px] py-[8px] hover:bg-gray-100 transition-colors rounded-[10px] text-gray-700'
                      key={option.value}
                      title={option.value}
                      onClick={onClick}
                    >
                      {option.label}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
