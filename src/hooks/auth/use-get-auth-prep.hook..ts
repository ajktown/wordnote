import { useCallback } from 'react'
import { getAuthPrepApi } from '@/api/auth/get-auth-prep.api'

type UseIsSignedIn = [() => Promise<boolean>]
// TODO: This will be refactored for app-boot purpose
// TODO: API auth/prepare will be applied here.
// TODO: use isAuthPrepared
export const useIsSignedIn = (): UseIsSignedIn => {
  const onCheckIsSignedIn = useCallback(async () => {
    const [data] = await getAuthPrepApi()
    return data.isSignedIn
  }, [])

  return [onCheckIsSignedIn]
}
