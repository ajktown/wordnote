import { FC } from 'react'
import WordCard from '../molecule_word_card'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWords } from '../../hook/words/use-words.hook'
import { deleteWordByIdApi } from '../../api/words/delete-words.api'
import StyledIconButtonAtom from '../../atoms/StyledIconButton.a'
import { Stack } from '@mui/material'

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
    <Stack p={1} style={{ backgroundColor: "#aaa" }}>
      <StyledIconButtonAtom
        handleClick={() => handleClickRefresh()}
        jsxElementButton={<RefreshIcon />}
      />
      <Stack spacing={0.5} alignItems="center">
        {words.map(word => <WordCard key={word.id} word={word} onClickDeleteWord={onClickDeleteWord}/>)}
      </Stack>
    </Stack>
  )
}

export default WordCardsFrame