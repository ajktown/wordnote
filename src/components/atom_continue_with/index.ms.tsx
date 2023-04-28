import MicrosoftLogin from 'react-microsoft-login'
import { FC } from 'react'
import { OauthConst } from '@/constants/oauth.constant'
import { AuthError, AuthenticationResult } from '@azure/msal-common'
import { PublicClientApplication } from '@azure/msal-browser'
import { User } from '@microsoft/microsoft-graph-types'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

const ContinueWithMicrosoft: FC = () => {
  const onAuth = (
    error: AuthError | null,
    result?: AuthenticationResult | (AuthenticationResult & User),
    instance?: PublicClientApplication,
  ) => {
    // TODO: Implement
    console.log({
      error,
      result,
      instance,
    })
  }

  return (
    <MicrosoftLogin clientId={OauthConst.MsClientId} authCallback={onAuth}>
      <Stack border="1px solid red" alignItems={`center`} direction="row">
        <Image
          src="/oauth/ms-logo.png"
          alt="microsoft"
          width={20}
          height={20}
        />
        <Typography>{`Continue with Microsoft`}</Typography>
      </Stack>
    </MicrosoftLogin>
  )
}

export default ContinueWithMicrosoft
