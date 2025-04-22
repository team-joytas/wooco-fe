export type NotificationType = {
  id: number
  user_id: number
  target_id: number
  target_name: string
  type:
    | 'COURSE_COMMENT_CREATED'
    | 'PLAN_SHARE_REQUEST'
    | 'PLACE_REVIEW_REQUEST'
    | 'SYSTEM'
  created_at: string
  read_status:
    | 'READ'
    | 'UNREAD'
}

export type DeviceTokenType = {
  token: string
}