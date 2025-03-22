export const PLAN_URL = {
  base: '/plans',
  plans: () => `${PLAN_URL.base}`,
  detail: (id: string) => `${PLAN_URL.base}/${id}`,
}
