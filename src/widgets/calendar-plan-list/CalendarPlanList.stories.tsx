import type { Meta, StoryObj } from '@storybook/nextjs'
import CalendarPlanList from './CalendarPlanList'

const meta: Meta<typeof CalendarPlanList> = {
  title: 'Components/CalendarPlanList',
  component: CalendarPlanList,
}
export default meta

type Story = StoryObj<typeof CalendarPlanList>

export const Default: Story = {
  render:() =>
    <CalendarPlanList data={[
      {
        title: "test",
        groupName: "그룹1",
        groupColor: "#3D3D3D",
        /** Place info */
        place: [],
        /** How many peoples on the group? */
        groupSize: 1,
        /** Date */
        date: "2025-10-28",
      }]} />
}

