'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { postLogin } from '@/src/entities/auth'
import { useRouter } from 'next/navigation'
import Error from '@/app/error'
import { useAuth } from '@/src/shared/provider'
import { useToast } from '@/src/shared/ui'

function LoginHandler({ provider }: { provider: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const { setToken } = useAuth()
  const { show } = useToast()

  useEffect(() => {
    const handleLogin = async () => {
      if (code && state) {
        const isLogin = await postLogin(code, state, provider)
        if (isLogin.success) {
          setToken(localStorage.getItem('accessToken'))
          router.replace(isLogin.onBoarding ? '/onboard' : '/')
        } else {
          show('로그인에 실패했습니다. 다시 시도해주세요.')
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
