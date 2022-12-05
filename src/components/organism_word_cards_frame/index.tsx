import { FC, Suspense } from 'react'
import WordCard from '../molecule_word_card'
import { Stack, Box } from '@mui/material'
import NewWordBox from '../molecule_new_word_box'
import { useRecoilValue } from 'recoil'
import { searchInputState } from '@/recoil/searchInput.state'
import WordCardsFrameSearchNotFound from './index.search_not_found'
import WordCardsFrameRefreshButton from '../atom_word_cards_frame_refresh_button'
import { wordIdsState } from '@/recoil/words.state'
import StyledNull from '@/atoms/StyledNull'

const WordCardsFrame: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const wordIds = useRecoilValue(wordIdsState)

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
          <Suspense fallback={<StyledNull />}>
            {wordIds.map((wordId) => (
              <WordCard key={wordId} wordId={wordId} />
            ))}
          </Suspense>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default WordCardsFrame
