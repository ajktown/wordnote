import { FC } from 'react'
import WordCard from '../molecule_word_card'
import { useRecoilValue } from 'recoil'
import { searchInputState } from '@/recoil/words/searchInput.state'
import WordCardChunkSearchNotFound from './index.search_not_found'
import { wordIdsState } from '@/recoil/words/words.state'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardsChunkNoWordsFound from './index.no_words_found'
import WordCardChunkSearchFound from './index.search_found'
import WordIdsPagination from '../atom_word_ids_pagination'
import { TopOfPageButton } from '../atom_top_of_page_button'
import { Typography } from '@mui/material'

const WordCardsChunk: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const wordIds = useRecoilValue(wordIdsState)

  if (wordIds.length === 0) {
    if (!searchInput) return <WordCardsChunkNoWordsFound />
    return <WordCardChunkSearchNotFound />
  }

  return (
    <StyledSuspense>
      <WordCardChunkSearchFound />
      <Typography variant="caption">
        {wordIds.length} word cards
      </Typography>
      {wordIds.map((wordId) => (
        <WordCard key={wordId} wordId={wordId} />
      ))}
      <WordIdsPagination />
      <TopOfPageButton />
    </StyledSuspense>
  )
}

export default WordCardsChunk
