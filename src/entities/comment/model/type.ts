import { WriterType } from '@/src/entities/user'

export type CommentType = {
  id: string
  contents: string
  created_at: string
  writer: WriterType
}
