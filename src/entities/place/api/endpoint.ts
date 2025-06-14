export const PLACE_URL = {
  base: '/places',
  reviews: '/reviews',
  places: () => PLACE_URL.base,
  detail: (id: string) => `${PLACE_URL.base}/${id}`,
  reviewsByPlace: (id: string) => `${PLACE_URL.reviews}/places/${id}`,
  reviewDetail: (id: string) => `${PLACE_URL.reviews}/${id}`,
}
