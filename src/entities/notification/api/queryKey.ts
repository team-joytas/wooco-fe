export const NOTIFICATION_QUERY_KEY = {
  all: ['notifications'] as const,
  read: (id: string) => ['notification', id] as const,
}
