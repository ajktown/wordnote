import { FC, useCallback } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData, WordDataModifiableKey } from '@/api/words/words.interface'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import WordCardEditingTextField from '../atom_word_card_editing_text_field'

interface Props {
  word: WordData
}

const WordCardEditingMode: FC<Props> = ({ word }) => {
  const putWord = usePutWord(word.id)

  const handleClickModify = useCallback((wordKey: WordDataModifiableKey, newInput: string) => {
    putWord({ [wordKey]: newInput })
  }, [putWord])

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <WordCardEditingTextField
            wordKey={"term"}
            originalInput={word.term}
            onClickModify={handleClickModify}
          />
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
          <WordCardFavoriteIcon wordId={word.id} />
          <WordCardDeleteButton wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardEditingMode
