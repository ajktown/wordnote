import { Typography, Stack } from '@mui/material'
import { FC } from 'react'

const WordCardsChunkNoWordsFound: FC = () => {
  return (
    <Stack>
      <Typography>
        {`It seems like you do not have any words stored in our database. `}
      </Typography>
    </Stack>
  )
}

export default WordCardsChunkNoWordsFound
