import { isAppBootedState } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'
import { useOnClickSignOutApp } from './use-on-click-sign-out-app'
import { useAuthPrep } from '../auth/use-auth-prep.hook'

export const useIsAppBooted = (): boolean => {
  const [isBooted, setBooted] = useRecoilState(isAppBootedState)
  const onSignOutApp = useOnClickSignOutApp()
  const onGetAuthPrep = useAuthPrep()
  const router = useRouter()

  const onAppBooting = useRecoilCallback(
    () => async () => {
      try {
        const authPrep = await onGetAuthPrep()
        if (!authPrep || !authPrep.isSignedIn) throw new Error(`Not Signed In`)
        else router.push(PageConst.Welcome)
      } catch {
        await onSignOutApp()
      } finally {
        setBooted(true)
      }
    },
    [onGetAuthPrep, onSignOutApp, setBooted, router],
  )

  useEffect(() => {
    if (isBooted) return
    onAppBooting()
  }, [isBooted, onAppBooting])

  return isBooted
}
