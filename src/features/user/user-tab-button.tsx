export default function TabButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center text-middle cursor-pointer ${
        isActive
          ? 'border-container-light-blue'
          : 'border-dark-gray text-gray-400'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
