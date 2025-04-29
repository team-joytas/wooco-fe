import { SkeletonDiv } from './skeleton-div'

export function SkeletonTabButton({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`w-[50%] flex justify-center border-b-[5px] pb-[5px] items-center text-middle ${
        isActive
          ? 'border-container-light-blue'
          : 'border-dark-gray text-gray-400'
      }`}
    >
      <SkeletonDiv height={20} width={50} />
    </div>
  )
}
