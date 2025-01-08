import { FC, useMemo } from 'react'
import { ISharedWord } from '@/api/words/interfaces'
import StyledTextWithHeaderIcon from '@/atoms/StyledTextWithHeaderIcon'
import ScrabbleIcon from '@mui/icons-material/SendTimeExtension'
import { getScrabbleScore } from '@/lambdas/get-scrabble-score.lambda'
interface Props {
  word: ISharedWord
}
/**
 * WordCardScrabbleScorePart renders a score for a word in a Scrabble game.
 * Only supports English.
 */
const WordCardScrabbleScorePart: FC<Props> = ({ word }) => {
  const { term } = word
  const score = useMemo(() => getScrabbleScore(term), [term])

  return (
    <StyledTextWithHeaderIcon
      headerIcon={
        <ScrabbleIcon fontSize="small" color={score ? undefined : `disabled`} />
      }
      textProps={{
        variant: `caption`,
        color: score ? undefined : `textSecondary`,
      }}
      title={score ? `${score}` : ``}
    />
  )
}

export default WordCardScrabbleScorePart
