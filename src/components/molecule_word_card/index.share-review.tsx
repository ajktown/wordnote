import { FC } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { useRecoilValue } from 'recoil'
import WordCardUnknown from './index.unknown'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import WordCardSkeleton from './index.skeleton'
import { wordsFamily } from '@/recoil/words/words.state'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardTermAndPronunciation from '../atom_word_card_parts/index.term-and-pronunciation'

interface Props {
  wordId: string
}

const WordCardShareReview: FC<Props> = ({ wordId }) => {
  const shareReviewWord = useRecoilValue(wordsFamily(wordId))

  if (shareReviewWord === undefined) return <WordCardSkeleton />
  if (shareReviewWord === null) return <WordCardUnknown />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <WordCardTermAndPronunciation word={shareReviewWord} />
          <Typography variant="body2">
            {shareReviewWord.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={shareReviewWord} />
        </CardContent>
        <CardActions>
          <TagButtonChunk word={shareReviewWord} clickDisabled />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardShareReview
