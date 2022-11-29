import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import WordCardUndoDeleteButton from '../atom_word_card_undo_delete_button'
import { wordsFamily } from '@/recoils/state_atoms/words.state'
import { useRecoilValue } from 'recoil'

interface Props {
  wordId: string
}

const WordCardDeleted: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))

  if (word === null) return null

  return (
    <Card style={{ width: `100%`, borderRadius: 9 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Word "`}
          <span style={{ fontWeight: 700 }}>{word.term}</span>
          {`" Deleted`}
        </Typography>
        <WordCardUndoDeleteButton wordId={wordId} />
      </CardContent>
    </Card>
  )
}

export default WordCardDeleted
