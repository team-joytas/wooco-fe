export const USER_API = {
  base: '/users',
  baseCourse: '/courses/users',
  me: () => `${USER_API.base}/me`,
  user: (id: string) => `${USER_API.base}/${id}`,
  profile: () => `${USER_API.base}/profile`,
  summary: (id: string) => `${USER_API.base}/${id}/details`,

  likeRegions: () => '/regions/preferences',
  deleteLikeRegions: (id: string) =>
    `${USER_API.likeRegions()}/${id}`,

  courses: (id: string) => `${USER_API.baseCourse}/${id}`,
  likeCourses: (id: string) => `${USER_API.baseCourse}/${id}/like`,

  placeReviews: (id: string) => `/reviews/users/${id}`,
}
