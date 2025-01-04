import Link from 'next/link'

// TODO: 실제 데이터로 변경
export default function EventItem() {
  return (
    <Link
      href={'/events/1'}
      className={'w-[138px] h-[187px] rounded-[10px] bg-light-gray'}
    ></Link>
  )
}
