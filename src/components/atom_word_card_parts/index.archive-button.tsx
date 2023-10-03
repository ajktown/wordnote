import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import { usePutWordArchive } from '@/hooks/words/use-put-word-archive.hook'

interface Props {
  wordId: string
}
const WordCardArchiveButtonPart: FC<Props> = ({ wordId }) => {
  const [loading, onPutWordArchive] = usePutWordArchive(wordId, true)

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onPutWordArchive}
      jsxElementButton={<ArchiveIcon />}
    />
  )
}

export default WordCardArchiveButtonPart
