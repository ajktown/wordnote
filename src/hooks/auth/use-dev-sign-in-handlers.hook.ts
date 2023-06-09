// credentialResponse: CredentialResponse

import { postAuthByDevTokenApi } from '@/api/auth/post-auth-by-dev-token.api'
import { DEFAULT_MAIN_APP_PAGE } from '@/constants/pages.constant'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useAuthPrep } from './use-auth-prep.hook'

type PrivateOnClick = () => void
type PrivateOnError = () => void

type UseDevTokenSignInHandlers = [PrivateOnClick, PrivateOnError]

export const useDevTokenSignInHandlers = (): UseDevTokenSignInHandlers => {
  const router = useRouter()
  const onGetAuthPrep = useAuthPrep()

  const onClick: PrivateOnClick = useCallback(async () => {
    try {
      await postAuthByDevTokenApi()
      await onGetAuthPrep()
      router.push(DEFAULT_MAIN_APP_PAGE)
    } catch {
      throw new Error(`something went wrong`)
    }
  }, [router, onGetAuthPrep])

  const onError: PrivateOnError = useCallback(() => {
    console.log(`onError; ContinueWithDevToken`) // TODO: implement
  }, [])

  return [onClick, onError]
}
