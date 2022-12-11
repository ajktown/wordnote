import { FC } from 'react'
import WordCard from '../molecule_word_card'
import { useRecoilValue } from 'recoil'
import { searchInputState } from '@/recoil/searchInput.state'
import WordCardChunkSearchNotFound from './index.search_not_found'
import { filteredWordIdsState } from '@/recoil/words.state'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardsChunkNoWordsFound from './index.no_words_found'

const WordCardsChunk: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const filteredWordIds = useRecoilValue(filteredWordIdsState)

  if (filteredWordIds.length === 0) {
    if (!searchInput) return <WordCardsChunkNoWordsFound />
    return <WordCardChunkSearchNotFound />
  }

  return (
    <StyledSuspense>
      {filteredWordIds.map((wordId) => (
        <WordCard key={wordId} wordId={wordId} />
      ))}
    </StyledSuspense>
  )
}

export default WordCardsChunk
