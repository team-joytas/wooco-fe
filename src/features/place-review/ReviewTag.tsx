export function ReviewTag({ keyword }: { keyword: string }) {
  return (
    <div className='flex items-center px-[8px] py-[1px] rounded-[15px] text-[10px] text-white bg-container-light-blue'>
      {keyword}
    </div>
  )
}
