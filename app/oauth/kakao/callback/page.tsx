'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { postLogin } from '@/src/entities/auth'
import { useRouter } from 'next/navigation'

function LoginHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    const handleLogin = async () => {
      if (code && state) {
        const isLogin = await postLogin(code,state)
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginHandler />
    </Suspense>
  )
}
