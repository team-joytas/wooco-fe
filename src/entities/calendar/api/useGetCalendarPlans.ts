import { customAxios } from '@/src/shared/api'
import { CalendarPlanType } from '../model'
import { useQuery } from '@tanstack/react-query'
import { CALENDAR_URL } from './endpoint'
import mockCalendarPlans from '@/src/entities/calendar/model/mock.data'

export const getCalendarPlans = async (
  date: string
): Promise<CalendarPlanType[]> => {
  try {
    const response = await customAxios.get(CALENDAR_URL.plans(date))
    return response.data.results
  } catch (error) {
    console.error(error)
    return mockCalendarPlans
    // throw error
  }
}

export const useGetCalendarPlans = (date: string) => {

  const { data, isLoading } = useQuery({
    queryKey: ['calendarPlans', date],
    queryFn: () => getCalendarPlans(date),
    refetchOnWindowFocus: false,
    staleTime: 0,
  })

  return {data, isLoading}
}

