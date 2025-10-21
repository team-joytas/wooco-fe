import type { Preview } from '@storybook/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../app/globals.css'

const client = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={client}>
        <Story />
        </QueryClientProvider>
    ),
  ],
};

export default preview;