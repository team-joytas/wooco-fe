interface FloatingButtonProps {
  onClick: () => void
  text: string
}

export function FloatingMenuButton({ onClick, text }: FloatingButtonProps) {
  return (
    <button
      className='w-[80px] h-[30px] bg-white shadow-floating-button text-[14px] rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-200'
      onClick={onClick}
    >
      {text}
    </button>
  )
}
