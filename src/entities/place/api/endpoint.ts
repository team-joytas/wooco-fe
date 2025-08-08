export const PLACE_URL = {
  base: '/places',
  places: () => PLACE_URL.base,
  detail: (id: string) => `${PLACE_URL.base}/${id}`,
  aggregation: (id: string) => `${PLACE_URL.base}/${id}/aggregation`,
}
