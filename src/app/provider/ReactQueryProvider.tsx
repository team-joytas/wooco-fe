import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const QUERY_STALE_TIME = 1000 * 60 * 30

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            retry: 1,
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            initialData: () => {
              return undefined
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
