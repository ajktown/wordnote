import { FC } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData } from '@/api/words/interfaces'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'

interface Props {
  word: WordData
}

const WordCardReviewMode: FC<Props> = ({ word }) => {
  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {`???`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`???`}
          </Typography>
          <Typography variant="body2">
            {word.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={word} reviewMode />
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={word.id} />
          <TagButtonChunk wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardReviewMode
