import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useRecoilState } from 'recoil'
import { deleteWordByIdApi } from '@/api/words/delete-words.api'
import { WordData } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
interface Props {
  wordId: string
}
const WordCardDeleteButton: FC<Props> = ({ wordId }) => {
  const [word, setWord] = useRecoilState(wordsFamily(wordId))

  // TODO: You may return null as the data is both deleted in FE and probably on server.
  // but will skip for now.

  const onClickDeleteWord = async () => {
    try {
      await deleteWordByIdApi(wordId)

      const modifiedWord: WordData = Object.assign({}, word, {
        isDeleted: true,
      })
      setWord(modifiedWord)
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
