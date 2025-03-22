export const COMMENT_QUERY_KEY = {
  all: ['comments'] as const,
  detail: (id: string) => [...COMMENT_QUERY_KEY.all, id] as const,
}
