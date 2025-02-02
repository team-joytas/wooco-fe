export type CommentType = {
  id: string
  contents: string
  created_at: string
  writer: {
    id: string
    name: string
    profile_url: string
  }
}
