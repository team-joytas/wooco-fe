export const PLACE_QUERY_KEY = {
  all: ['places'] as const,
  detail: (place_id: string) => ['place', place_id] as const,
  reviews: (place_id: string) => ['place', place_id, 'reviews'] as const,
  review: (place_id: string, review_id: string) =>
    ['place', place_id, 'review', review_id] as const,
}
