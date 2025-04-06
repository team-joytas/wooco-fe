import { Tab } from '@/src/features/tabs'

export function TabButton({ tab }: { tab: Tab }) {
  return (
    <button
      className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center text-middle ${
        tab.isActive
          ? 'border-container-light-blue'
          : 'border-dark-gray text-gray-400'
      }`}
      onClick={tab.onClick}
    >
      {tab.label}
    </button>
  )
}
