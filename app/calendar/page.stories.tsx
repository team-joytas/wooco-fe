import type { Meta, StoryObj } from '@storybook/nextjs'
import Page from '@/app/calendar/page' // adjust path if it’s in a subfolder

const meta: Meta<typeof Page> = {
  title: 'Pages/CalendarPage',
  component: Page,
  parameters: {
    // layout: 'centered', // takes full width/height
  },
}
export default meta

type Story = StoryObj<typeof Page>

export const Default: Story = {
  render: () => <Page />,
}