import { useState, useEffect } from 'react'
import { CATEGORY } from '@/src/entities/category/type'

export default function SelectCategories({
  isList,
  setCategories,
  prevCategories,
}: {
  isList?: boolean
  setCategories: (categories: string[]) => void
  prevCategories?: string[]
}) {
  const [clickedCategory, setClickedCategory] = useState<string[]>(
    prevCategories || []
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

  useEffect(() => {
    setCategories(clickedCategory)
  }, [clickedCategory])

  const handleCategoryClick = (id: string) => {
    setClickedCategory((prev) => {
      if (prev.includes(id)) return prev
      return [id]
    })
  }

  return (
    <div
      className={`flex gap-[3px] text-[13px] ${
        isList
          ? 'w-full h-[50px] px-[10px] items-center overflow-x-auto border-b border-container-blue whitespace-nowrap'
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
