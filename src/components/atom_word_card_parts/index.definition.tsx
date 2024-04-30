import { ISharedWord } from '@/api/words/interfaces'
import { Typography } from '@mui/material'
import { FC } from 'react'

interface Props {
  word: ISharedWord
  hideSubDefinition?: boolean // true: does not display sub definition
}
const WordCardDefinitionPart: FC<Props> = ({ word, hideSubDefinition }) => {
  return (
    <Typography variant="body2">
      {word.definition}
      {!hideSubDefinition && word.subDefinition
        ? ` (${word.subDefinition})`
        : ``}
      <br />
    </Typography>
  )
}

export default WordCardDefinitionPart
