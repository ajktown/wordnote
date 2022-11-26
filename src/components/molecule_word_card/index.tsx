import { FC } from 'react'
import { WordData } from '../../api/words/words.interface'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StyledIconButtonAtom from '../../atoms/StyledIconButton.a'
import DeleteWordIcon from '@mui/icons-material/Delete';
import StyledTextButtonAtom from '../../atoms/StyledTextButton.a'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'

interface Props {
  word: WordData
  onClickDeleteWord: (wordId: string) => void
  onClickUndoDeleteWord: (wordId: string) => void
}

const WordCard: FC<Props> = ({ word, onClickDeleteWord, onClickUndoDeleteWord }) => {
  if (word.isDeleted) return (
    <Card style={{ width: "100%", borderRadius: 9 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Word "${word.term || "Unknown"}" Deleted`}
        </Typography>
        <StyledTextButtonAtom
          title={"Undo"}
          handleClick={() => onClickUndoDeleteWord(word.id)}
        />
      </CardContent>
    </Card>
  )

  return (
    <Card style={{ width: "100%", borderRadius: 9 }}>
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
        <StyledIconButtonAtom
          handleClick={() => onClickDeleteWord(word.id)}
          jsxElementButton={<DeleteWordIcon />}
        />
      </CardActions>
    </Card>
  )
}

export default WordCard