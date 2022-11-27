import { FC } from 'react'
import { WordData } from '../../api/words/words.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import StyledTextButtonAtom from '../../atoms/StyledTextButton'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import WordCardUndoDeleteButton from '../atom_word_card_undo_delete_button'

interface Props {
  word: WordData
}

const WordCard: FC<Props> = ({ word }) => {
  if (word.isDeleted)
    return (
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Word "` + word.term || `Unknown` + `" Deleted`}
          </Typography>
          <WordCardUndoDeleteButton wordId={word.id} />
        </CardContent>
      </Card>
    )

  return (
    <Card style={{ width: `100%`, borderRadius: 9 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {word.term}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {word.pronunciation}
        </Typography>
        <Typography variant="body2">
          {word.definition}
          <br />
          {word.example && `"${word.example}"`}
        </Typography>
      </CardContent>
      <CardActions>
        <WordCardFavoriteIcon word={word} />
        <WordCardDeleteButton wordId={word.id} />
      </CardActions>
    </Card>
  )
}

export default WordCard
