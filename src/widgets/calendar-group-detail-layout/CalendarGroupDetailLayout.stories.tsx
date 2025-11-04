import type { Meta, StoryObj } from '@storybook/nextjs'

import { CalendarGroupDetailLayout } from './CalendarGroupDetailLayout'

const meta = {
  component: CalendarGroupDetailLayout,
} satisfies Meta<typeof CalendarGroupDetailLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 0,
  },
}
