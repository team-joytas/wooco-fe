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

export type CommentMockType = {
  id: number
  user: {
    id: number
    profile_url: string
    name: string
  }
  created_at: string
  content: string
}
