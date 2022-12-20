import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { useDeleteWordCache } from '@/hooks/words/use-delete-word-cache.hook'
import { wordsFamily } from '@/recoil/words.state'
import { FC, Fragment, useCallback } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const [word, setWord] = useRecoilState(wordsFamily(wordId))
  const handleDeleteWordCache = useDeleteWordCache()

  // TODO: This should use a hook!!
  const onClickUndoDeleteWord = async () => {
    try {
      const rePostingWord: WordData = Object.assign({}, word, {
        isDeleted: false,
      })
      await postWordApi(rePostingWord)
      setWord(rePostingWord)
    } catch {}
  }

  const handleDeleteWordCacheCallback = useCallback(() => {
    handleDeleteWordCache(wordId)
  }, [wordId, handleDeleteWordCache])

  return (
    <Fragment>
      <StyledTextButtonAtom
        title={`Undo`}
        handleClick={
          () => onClickUndoDeleteWord() /** TODO: Should use callback */
        }
      />
      <StyledTextButtonAtom
        title={`Hide`}
        handleClick={handleDeleteWordCacheCallback}
      />
    </Fragment>
  )
}

export default WordCardUndoDeleteButton
