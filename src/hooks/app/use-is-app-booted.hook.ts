import { isAppBootedSelector } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { DEFAULT_MAIN_APP_PAGE } from '@/constants/pages.constant'
import { useOnSignOutApp } from './use-on-sign-out-app.hook'
import { useAuthPrep } from '../auth/use-auth-prep.hook'

export const useIsAppBooted = (): boolean => {
  const isBooted = useRecoilValue(isAppBootedSelector)
  const handleSignOutApp = useOnSignOutApp()
  const onGetAuthPrep = useAuthPrep()
  const router = useRouter()

  const onIsAppBooted = useRecoilCallback(
    () => async () => {
      try {
        if (!(await onGetAuthPrep())?.isSignedIn)
          throw new Error(`Not Signed In`)

        router.push(DEFAULT_MAIN_APP_PAGE)
      } catch {
        await handleSignOutApp()
      }
    },
    [onGetAuthPrep, handleSignOutApp, router],
  )

  useEffect(() => {
    if (isBooted) return
    onIsAppBooted()
  }, [isBooted, onIsAppBooted])

  return isBooted
}
