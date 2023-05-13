import { FC } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleSignInHandlers } from '@/hooks/auth/use-google-sign-in-handlers.hook'

const ContinueWithGoogle: FC = () => {
  const [onSuccess, onError] = useGoogleSignInHandlers()

  return (
    <GoogleLogin onSuccess={onSuccess} onError={onError} text="continue_with" />
  )
}

export default ContinueWithGoogle
