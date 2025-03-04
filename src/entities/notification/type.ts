export type Notification = {
  id: number
  createdAt: string
  content: string
  type: keyof typeof NOTIFICATION_TYPE
}

export const NOTIFICATION_TYPE = {
  comment: 'comment' as const,
  plan_review: 'plan_review' as const,
  plan_writing: 'plan_writing' as const,
  share_course: 'share_course' as const,
  wooco: 'wooco' as const,
}
