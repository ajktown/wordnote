import { FC } from 'react'
import { ISharedWord } from '@/api/words/interfaces'
import StyledTextWithHeaderIcon from '@/atoms/StyledTextWithHeaderIcon'
import ScrabbleIcon from '@mui/icons-material/SendTimeExtension'
interface Props {
  word: ISharedWord
}
/**
 * WordCardScrabbleScorePart renders a score for a word in a Scrabble game.
 * Only supports English.
 */
const WordCardScrabbleScorePart: FC<Props> = ({ word }) => {
  if (word.languageCode !== `en`) return null

  return (
    <StyledTextWithHeaderIcon
      headerIcon={<ScrabbleIcon fontSize="small" />}
      textProps={{
        variant: `caption`,
      }}
      title={`24`}
    />
  )
}

export default WordCardScrabbleScorePart
