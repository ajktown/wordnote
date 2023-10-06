import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { usePutWordArchive } from '@/hooks/words/use-put-word-archive.hook'

interface Props {
  wordId: string
}
const WordCardUnarchiveButtonPart: FC<Props> = ({ wordId }) => {
  const [loading, onPutWordArchive] = usePutWordArchive(wordId, false)

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onPutWordArchive}
      jsxElementButton={<UnarchiveIcon />}
    />
  )
}

export default WordCardUnarchiveButtonPart
