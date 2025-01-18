import { useState } from 'react'
import { CATEGORY } from '@/src/entities/category/type'

export default function SelectCategories({
  isList,
  setCategories,
}: {
  isList?: boolean
  setCategories?: (categories: string[]) => void
}) {
  const [clickedCategory, setClickedCategory] = useState<string[]>(() =>
    isList ? ['ALL'] : []
  )
  const ALL_CATEGORY_ID = 'ALL'
  const categoriesWithAll = [
    { id: ALL_CATEGORY_ID, value: '전체' },
    ...Object.keys(CATEGORY).map((key) => ({
      id: key,
      value: CATEGORY[key as keyof typeof CATEGORY],
    })),
  ]

  const categories = Object.keys(CATEGORY).map((key) => ({
    id: key,
    value: CATEGORY[key as keyof typeof CATEGORY],
  }))

  function handleCategoryClick(id: string) {
    setClickedCategory((prev) => {
      if (id === ALL_CATEGORY_ID) {
        return prev.includes(ALL_CATEGORY_ID) ? [] : [ALL_CATEGORY_ID]
      } else {
        if (prev.includes(ALL_CATEGORY_ID)) {
          return [id]
        } else {
          return prev.includes(id)
            ? prev.filter((categoryId) => categoryId !== id)
            : [...prev, id]
        }
      }
    })
    setCategories?.(clickedCategory)
  }

  return (
    <div
      className={`flex gap-[3px] text-[13px] ${
        isList
          ? 'w-full h-[50px] items-center overflow-x-auto border-b border-container-blue whitespace-nowrap'
          : 'flex-wrap'
      }`}
    >
      {isList
        ? categoriesWithAll.map((category) =>
            CategoryItem({
              id: category.id,
              value: category.value,
              onClick: handleCategoryClick,
              isActive: clickedCategory.includes(category.id),
            })
          )
        : categories.map((category) =>
            CategoryItem({
              id: category.id,
              value: category.value,
              onClick: handleCategoryClick,
              isActive: clickedCategory.includes(category.id),
            })
          )}
    </div>
  )
}

function CategoryItem({
  id,
  value,
  onClick,
  isActive,
}: {
  id: string
  value: string
  onClick: (id: string) => void
  isActive: boolean
}) {
  return (
    <div
      key={id}
      className={`inline-block px-[10px] py-[5px] rounded-full cursor-pointer border border-container-blue text-middle transition-all duration-100
        ${
          isActive
            ? 'bg-container-blue text-white'
            : 'bg-white text-container-blue'
        } mx-[2px]`}
      onClick={() => onClick(id)}
    >
      {value}
    </div>
  )
}
