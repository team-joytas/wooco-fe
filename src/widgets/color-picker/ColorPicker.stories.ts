import type { Meta, StoryObj } from '@storybook/nextjs';
import ColorPicker from './index';

const meta = {
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};