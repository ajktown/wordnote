import { FC } from 'react'
import { WordData } from '../../api/words/words.interface'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StyledIconButtonAtom from '../../atoms/StyledIconButton.a'
import DeleteWordIcon from '@mui/icons-material/Delete';

interface Props {
  word: WordData
  onClickDeleteWord: (wordId: string) => void
}
const WordCard: FC<Props> = ({ word, onClickDeleteWord }) => {
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
        <StyledIconButtonAtom
          handleClick={() => onClickDeleteWord(word.id)}
          jsxElementButton={<DeleteWordIcon />}
        />
      </CardActions>
    </Card>
  )
}

export default WordCard