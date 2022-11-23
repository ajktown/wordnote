import { FC, Fragment } from 'react'
import WordCard from '../molecule_word_card'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWords } from '../../hook/words/use-words.hook'
import { deleteWordByIdApi } from '../../api/words/delete-words.api'
import StyledIconButtonAtom from '../../atoms/StyledIconButton.a'

const WordCardsFrame: FC = () => {
  const [words, setWords, handleClickRefresh] = useWords()

  if (words === undefined) return <h3>"Loading..."</h3>

  const onClickDeleteWord = async (wordId: string) => {
    try {
      deleteWordByIdApi(wordId)
      setWords(words.filter(word => word.id !== wordId))
    } catch {}
  }

  return (
    <Fragment>
      <StyledIconButtonAtom
        handleClick={() => handleClickRefresh()}
        jsxElementButton={<RefreshIcon />}
      />
      {words.map(word => <WordCard key={word.id} word={word} onClickDeleteWord={onClickDeleteWord}/>)}
    </Fragment>
  )
}

export default WordCardsFrame