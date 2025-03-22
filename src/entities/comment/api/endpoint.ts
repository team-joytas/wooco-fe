export const COMMENT_URL = {
  base: '/comments',
  comments: (id: string) => `${COMMENT_URL.base}/courses/${id}`,
  detail: (id: string) => `${COMMENT_URL.base}/${id}`,
}
