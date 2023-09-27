import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback, useState } from 'react'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

interface Props {
  wordId: string
}
const WordCardUnarchiveButtonPart: FC<Props> = ({ wordId }) => {
  const onPutWord = usePutWord(wordId)
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await onPutWord({ isArchived: false })
    } finally {
      setLoading(false)
    }
  }, [onPutWord])

  return (
    <StyledIconButtonAtom
      isDisabled={loading}
      onClick={onClick}
      jsxElementButton={<UnarchiveIcon />}
    />
  )
}

export default WordCardUnarchiveButtonPart
