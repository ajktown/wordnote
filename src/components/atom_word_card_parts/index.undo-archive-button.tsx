import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { FC, Fragment, useCallback, useState } from 'react'

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
    <Fragment>
      <StyledTextButtonAtom
        isLoading={loading}
        title={`Undo Archive`}
        onClick={onClick}
      />
    </Fragment>
  )
}

export default WordCardUndoArchiveButtonPart
