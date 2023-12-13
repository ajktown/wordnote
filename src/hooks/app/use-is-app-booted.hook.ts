import { isAppBootedSelector } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { DEFAULT_MAIN_APP_PAGE, PageConst } from '@/constants/pages.constant'
import { useOnSignOutApp } from './use-on-sign-out-app.hook'
import { useAuthPrep } from '../auth/use-auth-prep.hook'

export const useIsAppBooted = (): boolean => {
  const isBooted = useRecoilValue(isAppBootedSelector)
  const handleSignOutApp = useOnSignOutApp()
  const onGetAuthPrep = useAuthPrep()
  const router = useRouter()

  const onAppBooting = useRecoilCallback(
    () => async () => {
      try {
        const authPrep = await onGetAuthPrep()

        // The page share does not require sign in. But it should get the auth prep data just in case.
        if (router.pathname === PageConst.Share) return
        if (!authPrep?.isSignedIn) throw new Error(`Not Signed In`)

        router.push(DEFAULT_MAIN_APP_PAGE)
      } catch {
        await handleSignOutApp()
      }
    },
    [onGetAuthPrep, handleSignOutApp, router],
  )

  useEffect(() => {
    if (isBooted) return
    onAppBooting()
  }, [isBooted, onAppBooting])

  return isBooted
}
