import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { wordsFamily } from '@/recoil/words.state'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  wordId: string
}
const WordCardUndoDeleteButton: FC<Props> = ({ wordId }) => {
  const [word, setWord] = useRecoilState(wordsFamily(wordId))

  const onClickUndoDeleteWord = async () => {
    try {
      const rePostingWord: WordData = Object.assign({}, word, {
        isDeleted: false,
      })
      await postWordApi(rePostingWord)
      setWord(rePostingWord)
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
