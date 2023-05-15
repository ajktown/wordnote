import { isAppBootedState } from '@/recoil/app/app.state'
import { useEffect } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { PageConst } from '@/constants/pages.constant'
import { getAuthPrepApi } from '@/api/auth/get-auth-prep.api'
import { useOnClickSignOutApp } from './use-on-click-sign-out-app'

export const useIsAppBooted = (): boolean => {
  const [isBooted, setBooted] = useRecoilState(isAppBootedState)
  const onSignOutApp = useOnClickSignOutApp()
  const router = useRouter()

  const onAppBooting = useRecoilCallback(
    () => async () => {
      try {
        const [data] = await getAuthPrepApi()
        if (!data.isSignedIn) throw new Error(`Not Signed In`)
        else router.push(PageConst.Welcome)
      } catch {
        await onSignOutApp()
      } finally {
        setBooted(true)
      }
    },
    [onSignOutApp, setBooted, router],
  )

  useEffect(() => {
    if (isBooted) return
    onAppBooting()
  }, [isBooted, onAppBooting])

  return isBooted
}
