import Link from 'next/link'

interface NoticeItemProps {
  data: {
    id: number
    title: string
    createdAt: string
  }
}

// TODO: 실제 데이터로 변경
export default function NoticeItem() {
  return (
    <Link
      href={`/notices/1`}
      className={
        'w-full h-fit px-[20px] py-[16px] bg-light-gray rounded-[10px] flex justify-between items-center'
      }
    >
      <p className={'text-sub font-semibold'}>[공지] 우코 이용약관 개정 안내</p>
      <p className={'text-sub font-light opacity-50'}>2024-12-24</p>
    </Link>
  )
}
