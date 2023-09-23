import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback, useState } from 'react'
import ArchiveIcon from '@mui/icons-material/Archive'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

interface Props {
  wordId: string
}
const WordCardArchiveButtonPart: FC<Props> = ({ wordId }) => {
  const onPutWord = usePutWord(wordId)
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await onPutWord({ isArchived: true })
    } catch {
      setLoading(false)
    }
  }, [onPutWord])

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onClick}
      jsxElementButton={<ArchiveIcon />}
    />
  )
}

export default WordCardArchiveButtonPart
