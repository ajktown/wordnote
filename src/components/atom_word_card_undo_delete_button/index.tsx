import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useDeleteWordCache } from '@/hooks/words/use-delete-word-cache.hook'
import { selectedWordIdForDialogState, wordsFamily } from '@/recoil/words.state'
import { FC, Fragment, useCallback } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const [word, setWord] = useRecoilState(wordsFamily(wordId))
  const handleDeleteWordCache = useDeleteWordCache()
  const resetSelectedWordIdForDialog = useResetRecoilState(selectedWordIdForDialogState)

  // TODO: This should use a a separate hook in a different file!
  const onClickUndoDeleteWord = useCallback(async () => {
    try {
      const rePostingWord: WordData = Object.assign({}, word, {
        isDeleted: false,
      })
      await postWordApi(rePostingWord)
      setWord(rePostingWord)
    } catch {}
  }, [word, setWord])

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
