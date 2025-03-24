import { useState, useEffect } from 'react'
import { CATEGORY } from '@/src/entities/course'

export default function SelectCategories({
  isInCourseList,
  setCategories,
  prevCategories,
}: {
  isInCourseList?: boolean
  setCategories: (categories: string[]) => void
  prevCategories?: string[]
}) {
  const [clickedCategory, setClickedCategory] = useState<string[]>(
    prevCategories || []
  )
  const categories = Object.keys(CATEGORY).map((key) => ({
    id: key,
    value: CATEGORY[key as keyof typeof CATEGORY],
  }))

  const ALL_CATEGORY_ID = 'ALL'
  const categoriesWithAll = [
    { id: ALL_CATEGORY_ID, value: '전체' },
    ...categories,
  ]

  const categoryList = isInCourseList ? categoriesWithAll : categories

  useEffect(() => {
    setCategories(clickedCategory)
  }, [clickedCategory])

  const handleCategoryClick = (id: string) => {
    setClickedCategory((prev) => {
      if (isInCourseList) {
        return prev.includes(id) ? prev : [id]
      }

      if (id === ALL_CATEGORY_ID) {
        return prev.includes(ALL_CATEGORY_ID) ? [] : [ALL_CATEGORY_ID]
      }

      if (prev.includes(ALL_CATEGORY_ID)) {
        return [id]
      }

      return prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    })
  }

  return (
    <div
      className={`flex gap-[3px] text-[13px] ${
        isInCourseList
          ? 'w-full h-[50px] px-[10px] items-center overflow-x-auto border-b border-container-blue whitespace-nowrap'
          : 'flex-wrap'
      }`}
    >
      {categoryList.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          value={category.value}
          onClick={handleCategoryClick}
          isActive={clickedCategory.includes(category.id)}
        />
      ))}
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
