import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { deprecatedWordsState } from '@/recoils/state_atoms/words.state'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const [words, setWords] = useRecoilState(deprecatedWordsState)

  const onClickUndoDeleteWord = async () => {
    try {
      const copiedWords = [...words]
      const foundIndex = copiedWords.findIndex((word) => word.id === wordId)
      if (foundIndex === -1) return // already deleted.

      const previouslyDeletedWord: WordData = {
        ...words[foundIndex],
        isDeleted: false,
      }
      postWordApi(previouslyDeletedWord)

      copiedWords.splice(foundIndex, 1, previouslyDeletedWord)
      setWords(copiedWords)
    } catch {}
  }

  return (
    <StyledTextButtonAtom
      title={`Undo`}
      handleClick={() => onClickUndoDeleteWord()}
    />
  )
}

export default WordCardUndoDeleteButton
