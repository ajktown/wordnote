import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useRecoilState } from 'recoil'
import { wordsState } from '@/recoils/state_atoms/words.state'
import { deleteWordByIdApi } from '@/api/words/delete-words.api'
interface Props {
  wordId: string
}
const WordCardDeleteButton: FC<Props> = ({ wordId }) => {
  const [words, setWords] = useRecoilState(wordsState)
  const onClickDeleteWord = async () => {
    try {
      await deleteWordByIdApi(wordId)

      const copiedWords = [...words]
      const foundIndex = copiedWords.findIndex((word) => word.id === wordId)
      if (foundIndex === -1) return // already deleted.

      copiedWords.splice(foundIndex, 1, {
        ...words[foundIndex],
        isDeleted: true,
      })
      setWords(copiedWords)
    } catch {}
  }

  return (
    <StyledIconButtonAtom
      handleClick={() => onClickDeleteWord()}
      jsxElementButton={<DeleteWordIcon />}
    />
  )
}

export default WordCardDeleteButton
