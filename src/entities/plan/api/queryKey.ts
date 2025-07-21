export const PLAN_QUERY_KEY = {
  all: ['plans'] as const,
  detail: (plan_id: string) => ['plan', plan_id] as const,
}
