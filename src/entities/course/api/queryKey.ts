export const COURSE_QUERY_KEY = {
  all: (params: {
    sort?: 'RECENT' | 'POPULAR'
    primary_region?: string
    secondary_region?: string
    limit?: number
    category?: string
  }) =>
    [
      'courses',
      params.sort,
      params.limit,
      params.category,
      params.primary_region,
      params.secondary_region,
    ] as const,
  detail: (id: string) => ['course', id] as const,
  post: ['course', 'post'] as const,
}
