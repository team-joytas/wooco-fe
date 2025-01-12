export type CommentType = {
  id: number
  user: {
    id: number
    profile_url: string
    name: string
  }
  created_at: string
  content: string
}
