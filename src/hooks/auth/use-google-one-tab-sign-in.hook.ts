import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useGoogleSignInHandlers } from '@/hooks/auth/use-google-sign-in-handlers.hook'
import { useRecoilValue } from 'recoil'
import { isSignedInSelector } from '@/recoil/app/app.selectors'

export const useGoogleOneTabSignIn = (): void => {
  const isSignedIn = useRecoilValue(isSignedInSelector)
  const [onSuccess, onError] = useGoogleSignInHandlers()

  useGoogleOneTapLogin({
    onSuccess,
    onError,
    disabled: isSignedIn,
  })
}
