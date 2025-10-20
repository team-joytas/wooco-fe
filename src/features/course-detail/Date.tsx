export function Date({ date, username }: { date: string; username: string }) {
  return (
    <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
      <p className='px-[50px] text-sub'>
        <span className='text-brand font-normal'>{username}</span>
        &nbsp;님이 방문한 날짜에요.
      </p>
      <span className='text-middle flex items-center justify-center mx-[30px] px-[14px] py-[10px] bg-bright-gray rounded-full opacity-80'>
        {date}
      </span>
    </section>
  )
}
