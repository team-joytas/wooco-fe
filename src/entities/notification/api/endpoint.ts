export const NOTIFICATION_URL = {
  base: '/notifications',
  detail: (id: string) => `${NOTIFICATION_URL.base}/${id}`,
}
