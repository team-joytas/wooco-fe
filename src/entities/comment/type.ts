import { WriterType } from '../user/type'

export type CommentType = {
  id: string
  contents: string
  created_at: string
  writer: WriterType
}
