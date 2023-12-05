import { isFirstTimeUserSelector } from '@/recoil/app/app.selectors'
import { Alert, Typography } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'

const FirstTimeUserWelcomeMessage: FC = () => {
  const [isClosed, setClosed] = useState<boolean>(false)
  const isFirstTimeUser = useRecoilValue(isFirstTimeUserSelector)

  const onClose = useCallback(() => setClosed(true), [])

  if (!isFirstTimeUser || isClosed) return null

  return (
    <Alert severity="info" onClose={onClose}>
      <Typography variant="caption">
        {`🎉 Congratulations, you've just joined Wordnote - AJK Town!`}
      </Typography>
    </Alert>
  )
}

export default FirstTimeUserWelcomeMessage
