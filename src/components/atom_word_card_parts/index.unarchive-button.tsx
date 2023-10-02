import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

interface Props {
  wordId: string
}
const WordCardUnarchiveButtonPart: FC<Props> = ({ wordId }) => {
  const [loading, onPutWord] = usePutWord(wordId)
  const onClick = useCallback(
    () => onPutWord({ isArchived: false }),
    [onPutWord],
  )

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onClick}
      jsxElementButton={<UnarchiveIcon />}
    />
  )
}

export default WordCardUnarchiveButtonPart
