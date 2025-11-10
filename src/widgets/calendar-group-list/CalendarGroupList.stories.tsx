import type { Meta, StoryObj } from '@storybook/nextjs'

import CalendarGroupList from './CalendarGroupList'

const meta = {
  component: CalendarGroupList,
} satisfies Meta<typeof CalendarGroupList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
