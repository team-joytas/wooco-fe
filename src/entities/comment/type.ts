import { WriterType } from '../user'

export type CommentType = {
  id: string
  contents: string
  created_at: string
  writer: WriterType
}
