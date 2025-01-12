import Image from 'next/image'
import logo_long from '@/src/assets/images/(logo)/logo_long_color.png'
import Link from 'next/link'

export default function SectionBottom() {
  return (
    <section className='w-full h-fit py-[18px] px-[20px]'>
      <Image width={100} height={22} alt='logo' src={logo_long} />
      <div className='flex flex-col text-[10px] w-full mt-[20px] gap-[2px] text-black opacity-50'>
        <span>(주) 우코</span>
        <span>대표이사 김지홍 | 사업자등록번호 000-00-00000 </span>
        <span>통신판매업신고번호: 제 0000-0000호 </span>
        <span>대표전화: 000-0000-0000 </span>
        <span>서울특별시 어쩌구</span>

        <div className='flex flex-row gap-[5px] text-[10px] text-black opacity-80 mt-[5px]'>
          <Link href='/terms'>서비스 이용약관</Link>
          <span> | </span>
          <Link href='/privacy'>개인정보 처리방침</Link>
        </div>
      </div>
    </section>
  )
}
