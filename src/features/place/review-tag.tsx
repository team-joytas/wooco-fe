export default function ReviewTag({ keyword }: { keyword: string }) {
  return (
    <div className='flex items-center px-[8px] rounded-[15px] text-[10px] text-white bg-container-light-blue'>
      {keyword}
    </div>
  )
}
