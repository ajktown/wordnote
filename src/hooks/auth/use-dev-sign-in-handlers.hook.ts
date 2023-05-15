// credentialResponse: CredentialResponse

import { postAuthByDevTokenApi } from '@/api/auth/post-auth-by-dev-token.api'
import { MAIN_APP_PAGE } from '@/constants/pages.constant'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type PrivateOnClick = () => void
type PrivateOnError = () => void

type UseDevTokenSignInHandlers = [PrivateOnClick, PrivateOnError]

export const useDevTokenSignInHandlers = (): UseDevTokenSignInHandlers => {
  const router = useRouter()
  const onClick: PrivateOnClick = useCallback(async () => {
    try {
      await postAuthByDevTokenApi()
      router.push(MAIN_APP_PAGE)
    } catch {
      throw new Error(`something went wrong`)
    }
  }, [router])

  const onError: PrivateOnError = useCallback(() => {
    console.log(`onError; ContinueWithDevToken`) // TODO: implement
  }, [])

  return [onClick, onError]
}
