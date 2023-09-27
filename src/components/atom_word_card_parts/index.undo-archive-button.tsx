import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { FC, useCallback, useState } from 'react'

// TODO: Not used. either delete it or use it.
interface Props {
  wordId: string
}
const WordCardUndoArchiveButtonPart: FC<Props> = ({ wordId }) => {
  const onPutWord = usePutWord(wordId)
  const [loading, setLoading] = useState(false)

  const onClick = useCallback(async () => {
    try {
      setLoading(true)
      await onPutWord({ isArchived: false })
    } catch {
      setLoading(false)
    }
  }, [onPutWord])

  return (
    <StyledTextButtonAtom
      isLoading={loading}
      title={`Undo Archive`}
      onClick={onClick}
    />
  )
}

export default WordCardUndoArchiveButtonPart
