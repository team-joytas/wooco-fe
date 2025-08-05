export const PLACE_REVIEW_URL = {
  base: '/reviews',
  places: () => PLACE_REVIEW_URL.base,
  reviewsByPlace: (id: string) => `${PLACE_REVIEW_URL.base}/places/${id}`,
  reviewDetail: (id: string) => `${PLACE_REVIEW_URL.base}/${id}`,
}
