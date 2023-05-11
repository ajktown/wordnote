import { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { useDevSignInHandlers } from '@/hooks/auth/use-dev-sign-in-handlers.hook'

const ContinueWithDeveloperToken: FC = () => {
  const [onSuccess] = useDevSignInHandlers()

  return (
    <Stack
      border="1px solid #ABABAB"
      alignItems={`center`}
      direction="row"
      p={1}
      borderRadius={0.8}
      onClick={onSuccess}
    >
      <Typography
        fontFamily={`Open Sans`}
        fontSize={12}
      >{`Continue with Developer Token`}</Typography>
    </Stack>
  )
}

export default ContinueWithDeveloperToken
