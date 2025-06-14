export function HelperText({ message }: { message: string }) {
  return (
    <span className='text-[10px] pl-[10px] text-red-500 mt-[-5px]'>
      {message}
    </span>
  )
}
