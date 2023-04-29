// credentialResponse: CredentialResponse

import { postAuthGoogleApi } from '@/api/auth/post-auth-by-google.api'
import { PageConst } from '@/constants/pages.constant'
import { CookieKey, cookieLambda } from '@/lambdas/cookie.lambda'
import { CredentialResponse } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type PrivateOnSuccess = (credentialResponse: CredentialResponse) => void
type PrivateOnError = () => void

type UseGoogleSignInHandlers = [PrivateOnSuccess, PrivateOnError]

export const useGoogleSignInHandlers = (): UseGoogleSignInHandlers => {
  const router = useRouter()
  const onSuccess: PrivateOnSuccess = useCallback(
    async (cr: CredentialResponse) => {
      try {
        const [data] = await postAuthGoogleApi(cr)
        cookieLambda.set(CookieKey.AjktownSecuredAccessToken, data.accessToken)
        router.push(PageConst.Home)
      } catch {
        throw new Error(`something went wrong`)
      }
    },
    [router],
  )

  const onError: PrivateOnError = useCallback(() => {
    console.log(`onError; ContinueWithGoogle`) // TODO: implement
  }, [])

  return [onSuccess, onError]
}
