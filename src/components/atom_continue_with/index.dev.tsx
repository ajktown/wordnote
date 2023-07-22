import { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { useDevTokenSignInHandlers } from '@/hooks/auth/use-dev-sign-in-handlers.hook'
import { useRecoilValue } from 'recoil'
import { authPrepState } from '@/recoil/app/app.state'

const ContinueWithDeveloperToken: FC = () => {
  const [onClick] = useDevTokenSignInHandlers()

  const authPrep = useRecoilValue(authPrepState)
  if (authPrep?.env.isProduction) {
    return null
  }

  return (
    <Stack
      border="1px solid #ABABAB"
      alignItems={`center`}
      direction="row"
      p={1}
      borderRadius={0.8}
      onClick={onClick}
    >
      <Typography
        fontFamily={`Open Sans`}
        fontSize={12}
      >{`Continue with Developer Token`}</Typography>
    </Stack>
  )
}

export default ContinueWithDeveloperToken
