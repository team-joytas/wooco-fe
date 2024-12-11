import noti from '@images/noti.png'
import Image from 'next/image'
import HamburgerMenu from '@components/HamburgerMenu'

export default function Header() {
  return (
    <header className='max-w-[500px] bg-white w-full h-50 flex justify-between items-center  px-4'>
      <p className='text-blue-800 text-3xl font-bold'>WOOCO</p>
      <div className='flex justify-between items-center'>
        <button>
          <Image alt='notification' src={noti} className='w-24 h-auto' />
        </button>
        <HamburgerMenu />
      </div>
    </header>
  )
}
