import { FC, useState } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData } from '@/api/words/interfaces'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import StyledVisibilityAtom from '@/atoms/StyledVisibility'

interface Props {
  word: WordData
}

const WordCardReviewMode: FC<Props> = ({ word }) => {
  const [isPeakMode, setPeakMode] = useState(false)

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {isPeakMode ? word.term : `???`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isPeakMode ? word.pronunciation : `???`}
          </Typography>
          <Typography variant="body2">
            {word.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={word} reviewMode={!isPeakMode} />
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={word.id} />
          <StyledVisibilityAtom
            isVisible={!isPeakMode}
            onClick={() => setPeakMode(!isPeakMode)}
            visibleHoverMessage={`Peak this Wordcard`}
          />
          <TagButtonChunk wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardReviewMode
