import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useDeleteWordCache } from '@/hooks/words/use-delete-word-cache.hook'
import { usePostWordFromUndo } from '@/hooks/words/use-post-word-from-undo.hook'
import { selectedWordIdForDialogState } from '@/recoil/words.state'
import { FC, Fragment, useCallback } from 'react'
import { useResetRecoilState } from 'recoil'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const handleDeleteWordCache = useDeleteWordCache()
  const resetSelectedWordIdForDialog = useResetRecoilState(selectedWordIdForDialogState)
  const handlePostWordFromUndo = usePostWordFromUndo()

  const onClickUndoDeleteWord = useCallback(async () => {
    handlePostWordFromUndo(wordId)
  }, [wordId, handlePostWordFromUndo])

  const handleDeleteWordCacheCallback = useCallback(() => {
    handleDeleteWordCache(wordId)
    resetSelectedWordIdForDialog()
  }, [wordId, handleDeleteWordCache, resetSelectedWordIdForDialog])

  return (
    <Fragment>
      <StyledTextButtonAtom
        title={`Undo`}
        handleClick={onClickUndoDeleteWord}
      />
      <StyledTextButtonAtom
        title={`Hide`}
        handleClick={handleDeleteWordCacheCallback}
      />
    </Fragment>
  )
}

export default WordCardUndoDeleteButton
