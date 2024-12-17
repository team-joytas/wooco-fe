import { useState } from 'react'
import { Input, Space } from 'antd'

export default function SearchPlace() {
  const [results, setResults] = useState([
    { id: 10, name: '김밥천국' },
    { id: 11, name: '신김밥천국' },
    { id: 12, name: '김밥의 민족' },
    { id: 13, name: '김밥천국 압구정점' },
    { id: 14, name: '김밥천국 삼성점' },
    { id: 15, name: '김밥천국 수서점' },
    { id: 16, name: '김밥의 민족' },
    { id: 17, name: '푸트카페김밥천국 역삼역점' },
    { id: 18, name: '푸트카페김밥천국 신사점' },
    { id: 19, name: '김밥천국 포이점' },
    { id: 20, name: '김밥천국 개포점' },
  ])

  return (
    <div className='max-w-[375px] w-full m-auto'>
      <div className='flex flex-col gap-[10px]'>
        <span className='text-[15px] font-semibold'>장소명</span>
        <Input.Search
          placeholder='장소 이름을 입력해주세요.'
          className='w-full'
        />
      </div>
      <div className='w-full mt-[20px] mb-[20px] h-[2px] bg-gray-100' />
      <div className='flex flex-col gap-[10px] justify-center items-center'>
        {results.map((result) => {
          return (
            <span
              key={result.id}
              className='text-[12px] border-blue-100 rounded-[5px] border-[1px] w-full h-[40px] px-[16px] flex items-center justify-items-start'
            >
              {result.name}
            </span>
          )
        })}
      </div>
    </div>
  )
}
