import { gptApiKeySelector } from '@/recoil/preferences/preferenece.selector'
import { Alert, Typography } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const GptKeyRegisterer: FC = () => {
  const gptApiKey = useRecoilValue(gptApiKeySelector)

  return (
    <Alert severity="info">
      <Typography variant="caption">{gptApiKey}</Typography>
    </Alert>
  )
}

export default GptKeyRegisterer
