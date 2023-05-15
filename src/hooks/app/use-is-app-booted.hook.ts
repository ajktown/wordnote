import { isAppBootedSelector } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'
import { useOnClickSignOutApp } from './use-on-click-sign-out-app'
import { useAuthPrep } from '../auth/use-auth-prep.hook'

export const useIsAppBooted = (): boolean => {
  const isBooted = useRecoilValue(isAppBootedSelector)
  const onSignOutApp = useOnClickSignOutApp()
  const onGetAuthPrep = useAuthPrep()
  const router = useRouter()

  const onAppBooting = useRecoilCallback(
    () => async () => {
      try {
        const authPrep = await onGetAuthPrep()
        if (!authPrep || !authPrep.isSignedIn) throw new Error(`Not Signed In`)
        router.push(PageConst.Home)
      } catch {
        await onSignOutApp()
      }
    },
    [onGetAuthPrep, onSignOutApp, router],
  )

  useEffect(() => {
    if (isBooted) return
    onAppBooting()
  }, [isBooted, onAppBooting])

  return isBooted
}
