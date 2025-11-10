import { PlaceType } from '@/src/entities/place'

export interface CalendarPlanType {
  title: string,
  groupName: string,
  groupColor: string,
  /** Place info */
  place: PlaceType[],
  /** How many peoples on the group? */
  groupSize: number,
  /** Date */
  date: string,
}

export type CalendarGroupData = {
  id: string
  title: string
  groupName: string
  groupSize: number
  groupColor: string
}