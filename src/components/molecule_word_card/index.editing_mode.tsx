import { FC, useCallback } from 'react'
import { Card, CardActions, CardContent, Stack, Box} from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData, WordDataModifiableKey } from '@/api/words/words.interface'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import WordCardEditingTextField from '../molecule_word_card_editing_text_field'
import LanguageSelector from '../atom_language_selector'
import WordCardConfirmModifyButton from '../atom_word_card_confirm_modify_button'

interface Props {
  word: WordData
}

const WordCardEditingMode: FC<Props> = ({ word }) => {
  const putWord = usePutWord(word.id)

  const handleClickModify = useCallback(
    (wordKey: WordDataModifiableKey, newInput: string) => {
      putWord({ [wordKey]: newInput })
    },
    [putWord],
  )

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Stack spacing={1.5}>
            <LanguageSelector
              languageCode={word.languageCode}
              onClickModify={handleClickModify}
              useVerticalStyle
            />
            <WordCardEditingTextField
              wordKey={`term`}
              originalInput={word.term}
              onClickModify={handleClickModify}
            />
            <WordCardEditingTextField
              wordKey={`pronunciation`}
              originalInput={word.pronunciation}
              onClickModify={handleClickModify}
            />
            <WordCardEditingTextField
              wordKey={`definition`}
              originalInput={word.definition}
              onClickModify={handleClickModify}
            />
            <WordCardEditingTextField
              wordKey={`example`}
              originalInput={word.example}
              onClickModify={handleClickModify}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={word.id} />
          <WordCardDeleteButton wordId={word.id} />
          <Box flexGrow={1} />
          <WordCardConfirmModifyButton wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardEditingMode
