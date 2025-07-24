import Link from 'next/link'

// TODO: 실제 데이터로 변경
export function CardAnnouncement() {
  return (
    <Link
      href={`/notices/1`}
      className='w-full h-fit px-[20px] py-[16px] bg-light-gray rounded-[10px] flex justify-between items-center'
    >
      <p className='text-sub font-semibold'>
        [안내] 우코! 이렇게 사용하면 좋아요
      </p>
      <p className='text-sub font-light opacity-50'>2025-02-01</p>
    </Link>
  )
}
