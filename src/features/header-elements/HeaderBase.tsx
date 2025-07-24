export const HeaderBase = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <header
    className={`max-w-[375px] relative bg-white w-full h-[55px] min-h-[55px] flex justify-between items-center ${className}`}
  >
    {children}
  </header>
)
