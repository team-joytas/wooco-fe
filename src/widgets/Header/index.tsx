import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import setting from '@/src/assets/images/setting.png'

export default function Header({
  title,
  isBack,
}: {
  title: string
  isBack?: boolean
  close?: () => void
}) {
  const path = usePathname()
  const router = useRouter()
  const isUpdateUser = path?.includes('/setting')

  const handleClickBack = () => {
    if (isBack) {
      router.back()
    }
    if (close) {
      close()
    }
  }

  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
      <button onClick={handleClickBack}>
        <ChevronLeft size={24} color='black' strokeWidth={1.5} />
      </button>
      <p className='font-semibold text-[17px]'>{title}</p>
      {isUpdateUser ? (
        <Link href='/users/1/setting'>
          <Image width={24} height={24} alt='setting' src={setting} />
        </Link>
      ) : (
        <div className='w-[24px] h-[24px]'></div>
      )}
    </header>
  )
}
