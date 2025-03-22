export const PLAN_QUERY_KEY = {
  all: ['plans'] as const,
  detail: (id: string) => ['plan', id] as const,
}
