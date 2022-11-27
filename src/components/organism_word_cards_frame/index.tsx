import { FC, useCallback } from 'react'
import WordCard from '../molecule_word_card'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useWords } from '../../hook/words/use-words.hook'
import { deleteWordByIdApi } from '../../api/words/delete-words.api'
import StyledIconButtonAtom from '../../atoms/StyledIconButton'
import { Stack, Box } from '@mui/material'
import { postWordApi } from '@/api/words/post-word.api'
import NewWordBox from '../molecule_new_word_box'
import { WordData } from '@/api/words/words.interface'
import { useRecoilState } from 'recoil'
import { searchInputState } from '@/recoils/state_atoms/searchInput.sa'
import WordCardsFrameSearchNotFound from './index.search_not_found'

const WordCardsFrame: FC = () => {
  const [words, setWords, handleClickRefresh] = useWords()
  const [searchInput, ] = useRecoilState(searchInputState)


  const onClickAddWordCallback = useCallback(
    async (wordData: WordData) => {
      try {
        postWordApi()
        setWords(words ? [wordData, ...words] : [wordData])
      } catch {}
    },
    [words],
  )

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
      postWordApi()

      const copiedWords = [...words]
      const foundIndex = copiedWords.findIndex((word) => word.id === wordId)
      if (foundIndex === -1) return // already deleted.

      copiedWords.splice(foundIndex, 1, {
        ...words[foundIndex],
        isDeleted: false,
      })
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
            handleClick={() => handleClickRefresh()}
            jsxElementButton={<RefreshIcon />}
          />
        </Stack>
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          <NewWordBox onClickAddWordCallback={onClickAddWordCallback} />
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
