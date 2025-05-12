import error from '@/src/assets/icons/error.svg'
import logo from '@/src/assets/images/(logo)/logo_long_light.svg'
import Image from 'next/image'

export function Toast({ message }: { message: string }) {
  return (
    <div className='fixed top-[30px] left-1/2 transform -translate-x-1/2 z-[10001] flex flex-row items-center justify-between w-[355px] h-[55px] px-[20px] py-[10px] bg-brand rounded-[10px] shadow-custom'>
      <div className='flex items-center gap-[8px]'>
        <Image src={error} alt='error' width={20} height={20} />
        <span className='text-middle text-white font-medium'>{message}</span>
      </div>
      <Image src={logo} alt='logo' width={68} height={15} />
    </div>
  )
}
