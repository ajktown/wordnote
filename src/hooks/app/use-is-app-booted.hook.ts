import { isAppBootedState } from '@/recoil/app/app.state'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useIsSignedIn } from '../auth/use-get-auth-prep.hook.'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'

export const useIsAppBooted = (): boolean => {
  const [isBooted, setBooted] = useRecoilState(isAppBootedState)
  const [onCheckIsSignedIn] = useIsSignedIn()
  const router = useRouter()

  const handle = useCallback(async () => {
    try {
      const isSignedIn = await onCheckIsSignedIn()
      if (isSignedIn) router.push(PageConst.Home)
      else router.push(PageConst.Welcome)
    } catch {
      router.push(PageConst.Welcome)
    } finally {
      setBooted(true)
    }
  }, [onCheckIsSignedIn, router, setBooted])

  useEffect(() => {
    if (isBooted) return
    handle()
  }, [isBooted, handle])

  return isBooted
}
