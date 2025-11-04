import type { Meta, StoryObj } from '@storybook/nextjs'
import DatePicker from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: (() => {
    return {
      maxDotsPerDay: 3,
    }
  })(),
}
