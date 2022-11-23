import { FC } from 'react'
import WordCard from '../molecule_word_card'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useWords } from '../../hook/words/use-words.hook'
import { deleteWordByIdApi } from '../../api/words/delete-words.api'
import StyledIconButtonAtom from '../../atoms/StyledIconButton.a'
import { Stack, Box } from '@mui/material'

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
    <Stack width="100%" alignItems="center">
      <Stack p={1} 
        style={{ backgroundColor: "#aaa" }} 
        width="100%" 
        maxWidth={1000} 
        spacing={1}
        borderRadius={4}
      >
        {/* Header */}
        <Stack direction="row" spacing={0.5}>
          <Box flexGrow={1}/>
          <StyledIconButtonAtom
            handleClick={() => handleClickRefresh()}
            jsxElementButton={<RefreshIcon />}
          />
        </Stack>
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          {words.map(word => <WordCard key={word.id} word={word} onClickDeleteWord={onClickDeleteWord}/>)}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default WordCardsFrame