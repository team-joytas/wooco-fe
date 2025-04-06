export interface Tab {
  label: string
  isActive: boolean
  onClick: () => void
}

export type ScrollTabType = 'info' | 'review'
