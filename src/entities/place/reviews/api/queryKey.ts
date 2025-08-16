export const PLACE_REVIEW_QUERY_KEY = {
  detail: (place_id: string) => ['place', place_id] as const,
  reviews: (place_id: string) => ['place', place_id, 'reviews'] as const,
  review: (place_id: string, review_id: string) =>
    ['place', place_id, 'review', review_id] as const,
}
