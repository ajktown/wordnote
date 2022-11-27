import { FC } from 'react'
import { WordData } from '../../api/words/words.interface'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import WordCardUndoDeleteButton from '../atom_word_card_undo_delete_button'

interface Props {
  word: WordData
}

const WordCardDeleted: FC<Props> = ({ word }) => {
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
}

export default WordCardDeleted
