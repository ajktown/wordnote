import { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { useDevSignIn } from '@/hooks/auth/use-dev-sign-in.hook'
import { useRecoilValue } from 'recoil'
import { authPrepState } from '@/states/app/app.state'

const ContinueWithDeveloperToken: FC = () => {
  const onDevSignIn = useDevSignIn()

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
      onClick={onDevSignIn}
    >
      <Typography
        fontFamily={`Open Sans`}
        fontSize={12}
      >{`Continue with Developer Token`}</Typography>
    </Stack>
  )
}

export default ContinueWithDeveloperToken
