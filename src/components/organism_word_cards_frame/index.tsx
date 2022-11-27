import { FC, useCallback } from 'react'
import WordCard from '../molecule_word_card'
import RefreshIcon from '@mui/icons-material/Refresh'
import { deleteWordByIdApi } from '../../api/words/delete-words.api'
import StyledIconButtonAtom from '../../atoms/StyledIconButton'
import { Stack, Box } from '@mui/material'
import { postWordApi } from '@/api/words/post-word.api'
import NewWordBox from '../molecule_new_word_box'
import { WordData } from '@/api/words/words.interface'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { searchInputState } from '@/recoils/state_atoms/searchInput.sa'
import WordCardsFrameSearchNotFound from './index.search_not_found'
import { wordsState } from '@/recoils/state_atoms/words.state'

const WordCardsFrame: FC = () => {
  const [words, setWords] = useRecoilState(wordsState)
  const resetWords = useResetRecoilState(wordsState)
  const [searchInput, ] = useRecoilState(searchInputState)

  if (words === undefined) return <h3>"Loading..."</h3>

  const onClickDeleteWord = async (wordId: string) => {
    try {
      deleteWordByIdApi(wordId)

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

  const onClickUndoDeleteWord = async (wordId: string) => {
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

  if (!!searchInput) return <WordCardsFrameSearchNotFound />

  return (
    <Stack width="100%" alignItems="center">
      <Stack
        p={1}
        style={{ backgroundColor: `#aaa` }}
        width="100%"
        maxWidth={1000}
        spacing={1}
        borderRadius={4}
      >
        {/* Header */}
        <Stack direction="row" spacing={0.5}>
          <Box flexGrow={1} />
          <StyledIconButtonAtom
            handleClick={() => resetWords()}
            jsxElementButton={<RefreshIcon />}
          />
        </Stack>
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          <NewWordBox />
          {words.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              onClickDeleteWord={onClickDeleteWord}
              onClickUndoDeleteWord={onClickUndoDeleteWord}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default WordCardsFrame
