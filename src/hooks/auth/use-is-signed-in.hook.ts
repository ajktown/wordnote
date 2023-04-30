import { useCallback } from 'react'
import { getWhoAmIApi } from '@/api/auth/get-who-am-i.api'

type UseIsSignedIn = [() => Promise<boolean>]
export const useIsSignedIn = (): UseIsSignedIn => {
  const onCheckIsSignedIn = useCallback(async () => {
    const [data] = await getWhoAmIApi()
    return data.isSignedIn
  }, [])

  return [onCheckIsSignedIn]
}
