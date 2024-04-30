import { ISharedWord } from '@/api/words/interfaces'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

interface Props {
  word: ISharedWord
}
const WordCardTermAndPronunciation: FC<Props> = ({ word }) => {
  return (
    <Stack alignItems="center" direction="row" spacing={0.5} mb={0.5}>
      <Typography variant="h5" component="div">
        {word.term}
      </Typography>
      {word.pronunciation && (
        <Typography variant="caption" color="text.secondary">
          {`[${word.pronunciation}]`}
        </Typography>
      )}
    </Stack>
  )
}

export default WordCardTermAndPronunciation
