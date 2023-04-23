import { FC, useCallback } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const PRIVATE_GOOGLE_CLIENT_ID = `1029911886121-ir1hcpgk3hpanlaatkf61g6f2t8aanqo.apps.googleusercontent.com`

const ContinueWithGoogle: FC = () => {
  const onSuccess = useCallback(() => {
    console.log(`onSuccess; ContinueWithGoogle!`) // TODO: implement
  }, [])

  const onError = useCallback(() => {
    console.log(`onError; ContinueWithGoogle`) // TODO: implement
  }, [])

  return (
    <GoogleOAuthProvider clientId={PRIVATE_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={onSuccess} onError={onError} useOneTap />
    </GoogleOAuthProvider>
  )
}

export default ContinueWithGoogle
