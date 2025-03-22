export const COURSE_URL = {
  base: '/courses',
  courses: () => `${COURSE_URL.base}`,
  detail: (id: string) => `${COURSE_URL.base}/${id}`,
  like: (id: string) => `${COURSE_URL.base}/${id}/like`,
}
