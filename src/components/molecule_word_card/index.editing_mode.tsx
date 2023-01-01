import { FC, useCallback } from 'react'
import { Card, CardActions, CardContent, Stack, Box } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData, WordDataModifiableKey } from '@/api/words/words.interface'
import { useDeprecatedPutWord } from '@/hooks/words/deprecated-use-put-word.hook'
import WordCardEditingTextField from '../molecule_word_card_editing_text_field'
import LanguageSelector from '../atom_language_selector'
import WordCardConfirmModifyButton from '../atom_word_card_confirm_modify_button'

interface Props {
  word: WordData
}

const WordCardEditingMode: FC<Props> = ({ word }) => {
  const putWord = useDeprecatedPutWord(word.id)

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
            <WordCardEditingTextField wordKey={`term`} wordId={word.id} />
            <WordCardEditingTextField
              wordKey={`pronunciation`}
              wordId={word.id}
            />
            <WordCardEditingTextField wordKey={`definition`} wordId={word.id} />
            <WordCardEditingTextField wordKey={`example`} wordId={word.id} />
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
