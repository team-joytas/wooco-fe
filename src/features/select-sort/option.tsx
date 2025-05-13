interface OptionProps {
  value: string
  label: string
  onClick: () => void
}

export function Option({ value, label, onClick }: OptionProps) {
  return (
    <button
      className='w-[77px] h-[29px] text-center text-gray-500 text-middle01 rounded-[5px] bg-gray-100 hover:bg-brand hover:text-white'
      onClick={onClick}
    >
      {label}
    </button>
  )
}
