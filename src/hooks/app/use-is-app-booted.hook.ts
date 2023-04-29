import { isAppBootedState } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useIsSignedIn } from '../auth/use-is-signed-in.hook'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'

export const useIsAppBooted = () => {
  const [isBooted, setBooted] = useRecoilState(isAppBootedState)
  const [onCheckIsSignedIn] = useIsSignedIn()
  const router = useRouter()

  useEffect(() => {
    if (isBooted) return
    const isSignedIn = onCheckIsSignedIn()
    if (isSignedIn) {
      router.push(PageConst.Home)
    } else {
      router.push(PageConst.Welcome)
    }

    setBooted(true)
  }, [isBooted, router, setBooted, onCheckIsSignedIn])

  return isBooted
}
