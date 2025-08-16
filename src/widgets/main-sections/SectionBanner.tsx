function Banner({ children }: { children: React.ReactNode }) {
  return (
    <section className='px-[20px] py-[11px] border-b-[1px] border-container-blue w-full h-[87px] flex flex-col justify-center'>
      {children}
    </section>
  )
}

function Course() {
  return (
    <Banner>
      <p className='text-headline font-semibold flex flex-col leading-[1.3]'>
        <span>원하는 지역</span>
        <span>원하는 코스대로!</span>
      </p>
      <span className='text-sub text-description mt-[1px]'>
        다른 사람들이 만든 코스를 즐기고 공유해요
      </span>
    </Banner>
  )
}

function News() {
  return (
    <Banner>
      <p className='text-headline font-semibold flex flex-col leading-[1.3]'>
        <span>우리들의.코스</span>
        <span>우코 소식통!</span>
      </p>
      <span className='text-sub text-description mt-[1px]'>
        우코의 새로운 소식들을 빠르게 확인해요
      </span>
    </Banner>
  )
}

export const SectionBanner = { Course, News }
