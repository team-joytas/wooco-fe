export const USER_API = {
  base: '/users',
  baseRegions: '/regions/preferences',
  me: () => `${USER_API.base}/me`,
  user: (id: string) => `${USER_API.base}/${id}`,
  profile: () => `${USER_API.base}/profile`,
  likeRegions: () => `${USER_API.baseRegions}/preferences`,
  deleteLikeRegions: (id: string) =>
    `${USER_API.baseRegions}/preferences/${id}`,
}
