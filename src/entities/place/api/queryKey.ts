export const PLACE_QUERY_KEY = {
  all: ['places'] as const,
  detail: (place_id: string) => ['place', place_id] as const,
  aggregation: (place_id: string) => ['place', place_id, 'aggregation'] as const,
}
