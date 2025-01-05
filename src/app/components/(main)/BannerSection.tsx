function Banner({ children }: { children: React.ReactNode }) {
  return (
    <section className='px-[20px] py-[14px] border-b-[1px] border-header-line w-full h-fit flex flex-col'>
      {children}
    </section>
  )
}

function Course() {
  return (
    <Banner>
      <p className='text-headline font-bold'>원하는 지역</p>
      <p className='text-headline font-bold'>원하는 코스대로!</p>
      <span className='text-sub text-black opacity-50 mt-[1px]'>
        다른 사람들이 만든 코스를 즐기고 공유해요
      </span>
    </Banner>
  )
}

function News() {
  return (
    <Banner>
      <p className='text-headline font-bold'>우리들의.코스</p>
      <p className='text-headline font-bold'>우코 소식통!</p>
      <span className='text-sub text-black opacity-50'>
        우코의 새로운 소식들을 빠르게 확인해요
      </span>
    </Banner>
  )
}

export default { Course, News }
