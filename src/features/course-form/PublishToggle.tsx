import { useState } from 'react'

export function PublishToggle() {
  const [selected, setSelected] = useState<'public' | 'private'>('public')

  return (
    <div className='flex gap-[20px] items-center justify-center w-full text-sub mb-[10px]'>
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='radio'
          name='publish'
          value='public'
          checked={selected === 'public'}
          onChange={() => setSelected('public')}
          className='appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[6px] checked:border-brand cursor-pointer transition-all'
        />
        <span>공개</span>
      </label>
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='radio'
          name='publish'
          value='private'
          checked={selected === 'private'}
          onChange={() => setSelected('private')}
          className='appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[6px] checked:border-brand cursor-pointer transition-all'
        />
        <span>비공개</span>
      </label>
    </div>
  )
}
