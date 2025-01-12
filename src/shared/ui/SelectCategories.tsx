import { useState } from 'react'
import { categories } from '@/src/entities/category/type'

export default function SelectCategories() {
  const [clickedCategory, setClickedCategory] = useState<number[]>([])

  const handleCategoryClick = (id: number) => {
    setClickedCategory((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className='inline-flex flex-wrap gap-[5px]'>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`text-middle py-[5px] px-[10px] rounded-full border-[1px] border-container-blue transition-all duration-100 cursor-pointer ${
            clickedCategory.includes(category.id)
              ? 'bg-container-blue text-white'
              : 'bg-white text-container-blue'
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          {category.value}
        </button>
      ))}
    </div>
  )
}
