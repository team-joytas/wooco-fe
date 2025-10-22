export function Contents({
  contents,
  username,
}: {
  contents: string
  username: string
}) {
  return (
    <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
      <p className='px-[50px] text-sub'>
        <span className='text-brand font-normal'>{username}</span>
        &nbsp;님의 코스 설명이에요.
      </p>
      <span className='text-middle mx-[30px] px-[14px] py-[10px] bg-bright-gray rounded-[10px] whitespace-pre-line'>
        {contents}
      </span>
    </section>
  )
}
