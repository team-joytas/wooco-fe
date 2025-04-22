export type NotificationType = {
  id: number
  user_id: number
  target_id: number
  target_name: string
  is_read: true
  type:
    | 'COURSE_COMMENT_CREATED'
    | 'PLAN_SHARE_REQUEST'
    | 'PLACE_REVIEW_REQUEST'
    | 'SYSTEM'
  sent_at: string
}

export type DeviceTokenType = {
  token: string
}