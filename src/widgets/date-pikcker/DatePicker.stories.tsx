import type { Meta, StoryObj } from '@storybook/nextjs'
import DatePicker, { PlansByDate } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof DatePicker>

function makeMonth(year: number, month: number) {
  return { year, month } // month is 1-based here
}

function key(y: number, m: number, d: number) {
  const mm = `${m}`.padStart(2, '0')
  const dd = `${d}`.padStart(2, '0')
  return `${y}-${mm}-${dd}`
}

function mockSchedules(year: number, month: number, entries: Array<[number, number]>): PlansByDate {
  const map: PlansByDate = {}
  for (const [d, c] of entries) map[key(year, month, d)] = c
  return map
}

export const Default: Story = {
  args: (() => {
    const today = new Date()
    const { year, month } = makeMonth(today.getFullYear(), today.getMonth() + 1)
    const schedules = mockSchedules(year, month, [
      [1, 1],
      [3, 2],
      [7, 4],
      [12, 6], // will show 4 dots + "+2"
      [15, 3],
      [22, 5],
      [28, 1],
    ])
    return {
      schedules,
      maxDotsPerDay: 3,
    }
  })(),
}

export const WithManyReservations: Story = {
  args: (() => {
    const y = 2025
    const m = 8
    const schedules = mockSchedules(y, m, [
      [2, 7],
      [8, 10],
      [9, 1],
      [10, 2],
      [18, 5],
      [20, 9],
      [26, 12],
    ])
    return {
      schedules,
      maxDotsPerDay: 3,
      onDateSelect: (d: Date) => {
        console.log('Selected date:', d.toISOString())
      },
    }
  })(),
}

export const NavigateMonths: Story = {
  args: {
    schedules: {
      '2025-07-30': 2,
      '2025-07-31': 1,
      '2025-08-01': 3,
      '2025-08-15': 6,
      '2025-09-01': 4,
    },
  },
}
