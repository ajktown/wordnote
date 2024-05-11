import { ISharedWord } from '@/api/words/interfaces'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

// TODO: I think we can design later phase (for now it works)
interface Props {
  word: ISharedWord
  hideSubDefinition?: boolean // true: does not display sub definition
}
const WordCardDefinitionPart: FC<Props> = ({ word, hideSubDefinition }) => {
  return (
    <Stack spacing={0}>
      <Typography variant="body2">{word.definition}</Typography>
      {!hideSubDefinition && word.subDefinition && (
        <Typography variant="body2" color="text.secondary" fontStyle={`italic`}>
          {word.subDefinition}
        </Typography>
      )}
    </Stack>
  )
}

export default WordCardDefinitionPart
