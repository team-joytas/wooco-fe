import splashLogo from '@images/(logo)/splash_logo.svg'
import Image from 'next/image'
import logo_long from '@images/(logo)/logo_long.png'

export default function Splash() {
  return (
    <div className='w-full h-full bg-brand-blue flex flex-col items-center justify-center'>
      <Image
        className='w-full h-full absolute top-[-90px]'
        src={splashLogo}
        alt='splash'
        width={100}
        height={100}
      />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-[22px] font-bold'>
        <p>공유하고</p>
        <p>공유받는</p>
        <p>우리들의</p>
        <p>코스</p>
      </div>
      <Image
        className='absolute bottom-[50px] left-1/2 transform -translate-x-1/2'
        src={logo_long}
        alt='logo_long'
        width={100}
        height={100}
      />
    </div>
  )
}
