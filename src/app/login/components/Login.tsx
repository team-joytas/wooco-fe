import Spacer from '@/app/components/Spacer'
import Image from 'next/image'
import splashLogo from '@images/splash_logo.svg'

export default async function Login() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <>
      <Image
        className='w-full h-full absolute top-[-90px] opacity-40'
        src={splashLogo}
        alt='splash'
        width={100}
        height={100}
      />
      <div className='text-white w-[207px]'>
        <section className='flex flex-col'>
          <p className='text-[20px] font-bold'>반가워요!</p>
          <p className='text-[13px]'>일상 속의 투어 가이드, 우코입니다.</p>
        </section>
        <Spacer height={85} />
        <section className='flex flex-col gap-[8px]'>
          <p className='font-bold'>간편 회원가입</p>
          <div className='flex flex-col text-[11px]'>
            <span>자주 사용하는 아이디로 간편하게</span>
            <span>우코를 이용해보세요!</span>
          </div>
        </section>
      </div>
      <Spacer height={30} />
      <button className='h-[32px] w-[238px] rounded-full text-white font-extrabold bg-kakao text-[15px]'>
        카카오로 로그인하기
      </button>
    </>
  )
}
