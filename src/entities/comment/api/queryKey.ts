export const COMMENT_QUERY_KEY = {
  all: (course_id: string) => ['course', course_id, 'comments'] as const,
  detail: (course_id: string, comment_id: string) =>
    ['course', course_id, 'comments', comment_id] as const,
}
