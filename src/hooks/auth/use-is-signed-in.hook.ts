import { useCallback } from 'react'
import { CookieKey, cookieLambda } from '@/lambdas/cookie.lambda'

type UseIsSignedIn = [() => boolean]
export const useIsSignedIn = (): UseIsSignedIn => {
  const onCheckIsSignedIn = useCallback(() => {
    const cookie = cookieLambda.get(CookieKey.AjktownSecuredAccessToken)
    // TODO: Will validate with API server eventually, but for now only checks existence.
    return !!cookie
  }, [])

  return [onCheckIsSignedIn]
}
