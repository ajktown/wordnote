import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useDeleteWordCache } from '@/hooks/words/use-delete-word-cache.hook'
import { usePostWordFromUndo } from '@/hooks/words/use-post-word-from-undo.hook'
import { FC, Fragment } from 'react'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const [loadingCache, onDeleteWordCache] = useDeleteWordCache(wordId)
  const [loadingUndo, onPostWordFromUndo] = usePostWordFromUndo(wordId)

  return (
    <Fragment>
      <StyledTextButtonAtom
        isLoading={loadingUndo}
        isDisabled={loadingCache}
        title={`Undo`}
        onClick={onPostWordFromUndo}
      />
      <StyledTextButtonAtom
        isLoading={loadingCache}
        isDisabled={loadingUndo}
        title={`Hide`}
        onClick={onDeleteWordCache}
      />
    </Fragment>
  )
}

export default WordCardUndoDeleteButton
