'use client'
import crossIcon from '@/src/assets/icon/medium/cross.svg'
import checkIcon from '@/src/assets/icon/medium/check_colored.svg'
import settingIcon from '@/src/assets/icon/medium/setting.svg'
import checkboxChooseIcon from '@/src/assets/icon/checkbox_choose.svg'
import checkboxNoneIcon from '@/src/assets/icon/checkbox_non.svg'
import { CalendarGroupData } from '@/src/entities/calendar/model'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function CalendarGroupList({onClose}: {onClose?: () => void}) {
  const [isCreating, setIsCreating] = useState(false)
  const [groupName, setGroupName] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [groups] = useState<CalendarGroupData[]>(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: `g-${i + 1}`,
      title: `테스트 그룹 ${i + 1}`,
      groupName: `그룹 ${i + 1}`,
      groupSize: 1,
      groupColor: '1C2D3F',
    }))
  )

  // which groups are selected
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // focus input when the create UI opens
  useEffect(() => {
    if (isCreating) inputRef.current?.focus()
  }, [isCreating])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = groupName.trim()
    if (!name) return
    console.log('Create group:', name)

    // reset
    setGroupName('')
    setIsCreating(false)
  }

  const toggleGroup = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className='relative rounded-t-[20px] bg-white flex flex-col items-center'>
      {/* Header */}
      <div className='w-full h-[64px] px-4 flex justify-between items-center'>
        <span className='text-headline01 font-headline01 text-[#666666]'>
          그룹 목록
        </span>
        <button onClick={onClose}>
          <Image src={crossIcon} alt='crossIcon' />
        </button>
      </div>

      {/* Body */}
      <div className='relative w-full h-[60vh] overflow-y-auto  px-4 pb-4 flex flex-col  gap-8'>
        <div className='flex flex-col gap-3'>
          {/* Creator */}
          <div
            className={[
              ' transition-all duration-200',
              isCreating
                ? 'max-h-28 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-1',
            ].join(' ')}
          >
            <form
              // onSubmit={handleSubmit}
              className='flex flex-col gap-1.5 '
            >
              <span className='block text-middle01 font-middle01 text-gray-500'>
                그룹 명
              </span>
              <div className='w-full rounded-lg border-gray-200 border-[1px] py-2.5 px-3 flex justify-between relative'>
                <hr className="w-0.5 h-6 mr-1.5  bg-black-50"/>
                <input
                  ref={inputRef}
                  type='text'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder='홍의 캘린더 2025년 06월 17일'
                  className='bg-transparent outline-none w-full text-middle01 font-middle01 text-gray-700 '
                />
                <Image src={checkIcon} alt='checkIcon' />
              </div>
            </form>
          </div>

          {/* New Group Button */}
          <button
            type='button'
            onClick={() => setIsCreating((v) => !v)}
            className='w-full h-[40px] relative flex items-center justify-center text-middle01 font-middle01 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300'
          >
            새 그룹 만들기
          </button>
        </div>
        <hr className='block w-full border-gray-900' />
        {/* Group List */}
        <div className='flex flex-col gap-3'>
          {groups.map((group) => (
            <CalendarGroup
              key={group.id}
              title={group.title}
              groupName={group.groupName}
              groupSize={group.groupSize}
              groupColor={group.groupColor}
              selected={selectedIds.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CalendarGroup({
  title,
  groupName,
  groupSize,
  groupColor,
  selected,
  onToggle,
}:{title: string, groupName: string, groupSize: number, groupColor: string, selected: boolean, onToggle: () => void}) {
  return (
    <div className='w-full max-w-md p-5 rounded-xl bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)] hover:border-wooco_blue-primary border-2 transition-all cursor-pointer'>
      {/* Header */}
      <div className='flex items-center justify-between mb-3'>
        <div
          className='flex items-center space-x-1 text-sm rounded-2xl py-1 px-3'
          style={{
            color: `#${groupColor}`,
            backgroundColor: `#${groupColor}1A`,
          }}
        >
          <span
            className='w-2 h-2 rounded-full inline-block'
            style={{
              backgroundColor: `#${groupColor}`,
            }}
          />
          <span className='text-sm font-medium'>{groupName}</span>
        </div>
        <div className="flex items-center gap-[17px]">
          <button type="button" onClick={onToggle} aria-pressed={selected}>
            <Image src={selected ? checkboxChooseIcon :checkboxNoneIcon} alt="checkboxIcon"/>
          </button>
          <button type="button">
            <Image src={settingIcon} alt="settingIcon"/>
          </button>
        </div>
      </div>

      {/* Participant Info */}
      <div className='flex items-center text-base text-gray-600 text-sub02 font-sub02 mb-4 gap-2'>
        <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
        {/*TODO: replace the name with real data*/}
        <span>{"홍홍"}님 외 {groupSize}명</span>
      </div>
    </div>
  )
}