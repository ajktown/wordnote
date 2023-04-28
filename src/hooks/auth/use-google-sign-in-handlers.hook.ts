// credentialResponse: CredentialResponse

import { postAuthGoogleApi } from '@/api/auth/post-auth-by-google.api'
import { CredentialResponse } from '@react-oauth/google'
import { useCallback } from 'react'

type PrivateOnSuccess = (credentialResponse: CredentialResponse) => void
type PrivateOnError = () => void

type UseGoogleSignInHandlers = [PrivateOnSuccess, PrivateOnError]

export const useGoogleSignInHandlers = (): UseGoogleSignInHandlers => {
  const onSuccess: PrivateOnSuccess = useCallback((cr: CredentialResponse) => {
    postAuthGoogleApi(cr)
  }, [])

  const onError: PrivateOnError = useCallback(() => {
    console.log(`onError; ContinueWithGoogle`) // TODO: implement
  }, [])

  return [onSuccess, onError]
}
