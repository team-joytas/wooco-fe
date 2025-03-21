'use client'

import { SessionProvider } from 'next-auth/react'

export const NextAuthSessionProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
