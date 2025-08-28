import { PlaceType } from '@/src/entities/place/model/type'

export default function CalendarPlanList() {
  return (<div></div>)
}

export interface CalendarPlanProps {
  title: string,
  groupName: string,
  place: PlaceType[],
  /** How many peoples on the group? */
  groupSize: number,
}

function CalendarPlan(planData:CalendarPlanProps) {
  return (
    <div>

    </div>
  )

}