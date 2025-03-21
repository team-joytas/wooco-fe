import nextAuthOptions from '@/src/shared/lib/next-auth/options'
import NextAuth from 'next-auth'

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
