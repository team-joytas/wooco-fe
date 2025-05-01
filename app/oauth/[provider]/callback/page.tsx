'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { postLogin } from '@/src/entities/auth'
import { useRouter } from 'next/navigation'
import Error from '@/app/error'

function LoginHandler({ provider }: { provider: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    const handleLogin = async () => {
      if (code && state) {
        const isLogin = await postLogin(code, state, provider)
        if (isLogin.success && !isLogin.onBoarding) {
          router.replace('/')
        } else if (isLogin.onBoarding) {
          router.replace(`/onboard`)
        } else {
          router.replace('/login')
        }
      }
    }

    handleLogin()
  }, [code, router])

  return null
}

export default function Page({ params }: { params: { provider: string } }) {
  return (
    <Suspense fallback={<Error />}>
      <LoginHandler provider={params.provider} />
    </Suspense>
  )
}
