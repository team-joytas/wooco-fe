import { CoursePlanPlaceType } from '../../place/type'

export type PlanType = {
  id: number
  title: string
  contents: string
  primary_region: string
  secondary_region: string
  visit_date: string
  places: CoursePlanPlaceType[]
}

export type PlanPayloadType = {
  primary_region: string
  secondary_region: string
  title: string
  contents: string
  place_ids: string[]
  visit_date: string
}
