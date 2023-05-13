import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useGoogleSignInHandlers } from '@/hooks/auth/use-google-sign-in-handlers.hook'

export const useGoogleOneTabSignIn = (): void => {
  const [onSuccess, onError] = useGoogleSignInHandlers()

  useGoogleOneTapLogin({
    onSuccess,
    onError,
  })
}
