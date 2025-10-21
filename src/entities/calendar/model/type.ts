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