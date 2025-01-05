import { Suspense } from 'react'
import Splash from './components/Splash'
import Login from './components/Login'

export default function Page() {
  return (
    <div className='w-full h-full bg-brand'>
      <Suspense fallback={<Splash />}>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <Login />
        </div>
      </Suspense>
    </div>
  )
}
