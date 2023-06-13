import MicrosoftLogin from 'react-microsoft-login'
import { FC } from 'react'
import { OauthConst } from '@/constants/oauth.constant'
import { AuthError, AuthenticationResult } from '@azure/msal-common'
import { PublicClientApplication } from '@azure/msal-browser'
import { User } from '@microsoft/microsoft-graph-types'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { authPrepState } from '@/recoil/app/app.state'

const ContinueWithMicrosoft: FC = () => {
  const authPrep = useRecoilValue(authPrepState)
  if (authPrep?.env.isProduction) {
    return null
  }

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
      <Stack
        border="1px solid #8C8C8C"
        alignItems={`center`}
        direction="row"
        p={1}
        borderRadius={0.8}
      >
        <Image
          src="/oauth/ms-logo.png"
          alt="microsoft"
          width={20}
          height={20}
          style={{
            marginRight: 7,
          }}
        />
        <Typography
          fontFamily={`Open Sans`}
          fontSize={12}
        >{`Continue with Microsoft`}</Typography>
      </Stack>
    </MicrosoftLogin>
  )
}

export default ContinueWithMicrosoft
