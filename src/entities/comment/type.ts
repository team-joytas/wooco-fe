export type CommentType = {
  id: number
  contents: string
  created_at: string
  writer: {
    id: number
    name: string
    profile_url: string
  }
}
