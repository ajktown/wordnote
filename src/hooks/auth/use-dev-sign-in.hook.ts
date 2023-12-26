// credentialResponse: CredentialResponse

import { postAuthByDevTokenApi } from '@/api/auth/post-auth-by-dev-token.api'
import { DEFAULT_MAIN_APP_PAGE } from '@/constants/pages.constant'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useAuthPrep } from './use-auth-prep.hook'

/**
 * Returns a function "onDevSignIn", which is used to sign in with a dev token.
 * Only works in development mode.
 * Development mode can be only set by the API server.
 */
export const useDevSignIn = () => {
  const router = useRouter()
  const onGetAuthPrep = useAuthPrep()

  const onDevSignIn = useCallback(async () => {
    try {
      await postAuthByDevTokenApi()
      await onGetAuthPrep()
      router.push(DEFAULT_MAIN_APP_PAGE)
    } catch {
      throw new Error(`something went wrong`)
    }
  }, [router, onGetAuthPrep])

  return onDevSignIn
}
