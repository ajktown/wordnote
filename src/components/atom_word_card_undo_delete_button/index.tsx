import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useDeleteWordCache } from '@/hooks/words/use-delete-word-cache.hook'
import { usePostWordFromUndo } from '@/hooks/words/use-post-word-from-undo.hook'
import { FC, Fragment } from 'react'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const handleDeleteWordCache = useDeleteWordCache(wordId)
  const handlePostWordFromUndo = usePostWordFromUndo(wordId)

  return (
    <Fragment>
      <StyledTextButtonAtom title={`Undo`} onClick={handlePostWordFromUndo} />
      <StyledTextButtonAtom title={`Hide`} onClick={handleDeleteWordCache} />
    </Fragment>
  )
}

export default WordCardUndoDeleteButton
