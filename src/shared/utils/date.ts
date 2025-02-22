export const passFromCreate = (date: string) => {
  const now = new Date()
  const createdAt = new Date(date)
  const diffTime = now.getTime() - createdAt.getTime()

  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffYears = Math.floor(diffDays / 365)

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`
  } else if (diffDays < 7) {
    return `${diffDays}일 전`
  } else if (diffDays < 31) {
    return `${diffWeeks}주 전`
  } else if (diffDays < 365) {
    return `${diffMonths}달 전`
  } else {
    return `${diffYears}년 전`
  }
}

export const formatDateToYYYYMMDD = (date: string, type: 'slash' | 'hypen') => {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')

  return type === 'slash'
    ? `${year}/${month}/${day}`
    : `${year}-${month}-${day}`
}
