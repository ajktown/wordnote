// credentialResponse: CredentialResponse

import { postAuthByDevApi } from '@/api/auth/post-auth-by-dev.api'
import { PageConst } from '@/constants/pages.constant'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

type PrivateOnSuccess = () => void
type PrivateOnError = () => void

type UserDevSignInHandlers = [PrivateOnSuccess, PrivateOnError]

export const useDevSignInHandlers = (): UserDevSignInHandlers => {
  const router = useRouter()
  const onSuccess: PrivateOnSuccess = useCallback(async () => {
    try {
      await postAuthByDevApi()
      router.push(PageConst.Home)
      // TODO: This action to handle sign in
      // TODO: Successful or not must be under SSOT
    } catch {
      throw new Error(`something went wrong`)
    }
  }, [router])

  const onError: PrivateOnError = useCallback(() => {
    console.log(`onError; ContinueWithDevToken`) // TODO: implement
  }, [])

  return [onSuccess, onError]
}
