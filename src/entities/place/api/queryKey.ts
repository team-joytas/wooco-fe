export const PLACE_QUERY_KEY = {
  all: ['places'] as const,
  detail: (id: string) => ['place', id] as const,
  reviews: (id: string) => ['place', id, 'reviews'] as const,
}
