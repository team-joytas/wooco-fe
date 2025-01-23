import { CoursePlanPlaceType } from '@/src/entities/place/type'

export type PlanType = {
  id: number
  title: string
  contents: string
  primary_region: string
  secondary_region: string
  visit_date: string
  places: CoursePlanPlaceType[]
  categories: string[]
}

export type PlanPayloadType = {
  primary_region: string
  secondary_region: string
  categories: string[]
  title: string
  contents: string
  place_ids: string[]
  visit_date: string
}
