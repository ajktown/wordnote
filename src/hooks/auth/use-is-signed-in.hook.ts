import { useCallback } from 'react'
import { getWhoAmIApi } from '@/api/auth/get-who-am-i.api'

type UseIsSignedIn = [() => Promise<boolean>]
// TODO: This will be refactored for app-boot purpose
// TODO: API auth/prepare will be applied here.
// TODO: use isAuthPrepared
export const useIsSignedIn = (): UseIsSignedIn => {
  const onCheckIsSignedIn = useCallback(async () => {
    const [data] = await getWhoAmIApi()
    return data.isSignedIn
  }, [])

  return [onCheckIsSignedIn]
}
