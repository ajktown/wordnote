import { isFirstTimeUserSelector } from '@/recoil/app/app.selectors'
import { Alert, Typography } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const FirstTimeUserWelcomeMessage: FC = () => {
  const isFirstTimeUser = useRecoilValue(isFirstTimeUserSelector)

  if (!isFirstTimeUser) return null

  return (
    <Alert severity="info">
      <Typography variant="caption">
        {`🎉 Congratulations, you've just joined Wordnote - AJK Town!`}
      </Typography>
    </Alert>
  )
}

export default FirstTimeUserWelcomeMessage
