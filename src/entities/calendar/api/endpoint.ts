export const CALENDAR_URL = {
  base: '/calendar',
  plans: (date:string) => `${CALENDAR_URL.base}/?date=${date}`,
  // comments: (id: string) => `${CALENDAR_URL.base}/courses/${id}`,
  // detail: (id: string) => `${CALENDAR_URL.base}/${id}`,
}
