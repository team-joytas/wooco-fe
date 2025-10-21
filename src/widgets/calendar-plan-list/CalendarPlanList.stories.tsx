import type { Meta, StoryObj } from '@storybook/nextjs'
// import {CalendarPlanType} from '@/src/entities/calendar/model'
import CalendarPlanList from './CalendarPlanList'

const meta: Meta<typeof CalendarPlanList> = {
  title: 'Components/CalendarPlanList',
  component: CalendarPlanList,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof CalendarPlanList>

export const Default: Story = {

}

