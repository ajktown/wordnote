import { FC } from 'react'
import WordCard from '../molecule_word_card'
import { Stack, Box } from '@mui/material'
import NewWordBox from '../molecule_new_word_box'
import { useRecoilValue } from 'recoil'
import { searchInputState } from '@/recoils/state_atoms/searchInput.state'
import WordCardsFrameSearchNotFound from './index.search_not_found'
import { wordsState } from '@/recoils/state_atoms/words.state'
import WordCardsFrameRefreshButton from '../atom_word_cards_frame_refresh_button'

const WordCardsFrame: FC = () => {
  const words = useRecoilValue(wordsState)
  const searchInput = useRecoilValue(searchInputState)

  if (words === undefined) return <h3>"Loading..."</h3>
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
          <WordCardsFrameRefreshButton />
        </Stack>
        {/* Body */}
        <Stack spacing={0.5} alignItems="center">
          <NewWordBox />
          {words.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default WordCardsFrame
