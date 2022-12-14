import { FC, useState} from 'react'
import {
   Card, TextField, CardActions, CardContent, Typography
} from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import { useSetRecoilState } from 'recoil'
import {  wordsFamily } from '@/recoil/words.state'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData } from '@/api/words/words.interface'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
interface Props {
  word: WordData
}

// TODO: Create a beautiful hook for modifying resource
const WordCardEditingMode: FC<Props> = ({ word }) => {
  const setWord = useSetRecoilState(wordsFamily(word.id))

  const [term, setTerm] = useState(word.term)


  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <TextField
            id="standard-basic" 
            variant="standard"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {term !== word.term && (
            <StyledIconButtonAtom
              jsxElementButton={<CheckIcon />}
              handleClick={() => setWord({
                ...word,
                term,
              })}
            />
          )}
          {term !== word.term && (
            <StyledIconButtonAtom
              jsxElementButton={<ClearIcon />}
              handleClick={() => setTerm(word.term)}
            />
          )}
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
