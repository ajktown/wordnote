import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

interface Props {
  wordId: string
}
const WordCardArchiveButtonPart: FC<Props> = ({ wordId }) => {
  const [loading, onPutWord] = usePutWord(wordId)

  const onClick = useCallback(
    async () => onPutWord({ isArchived: true }),
    [onPutWord],
  )

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onClick}
      jsxElementButton={<ArchiveIcon />}
    />
  )
}

export default WordCardArchiveButtonPart
