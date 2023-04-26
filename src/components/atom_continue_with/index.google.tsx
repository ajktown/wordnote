import { FC, useCallback } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { OauthConst } from '@/constants/oauth.constant'

const ContinueWithGoogle: FC = () => {
  const onSuccess = useCallback(() => {
    console.log(`onSuccess; ContinueWithGoogle!`) // TODO: implement
  }, [])

  const onError = useCallback(() => {
    console.log(`onError; ContinueWithGoogle`) // TODO: implement
  }, [])

  return (
    <GoogleOAuthProvider clientId={OauthConst.GoogleClientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        text="continue_with"
      />
    </GoogleOAuthProvider>
  )
}

export default ContinueWithGoogle
