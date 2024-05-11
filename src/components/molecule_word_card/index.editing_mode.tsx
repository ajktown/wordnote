import { FC } from 'react'
import { Card, CardActions, CardContent, Stack, Box } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardEditingTextField from '../molecule_word_card_editing_text_field'
import LanguageSelector from '../atom_language_selector'
import WordCardConfirmModifyButton from '../atom_word_card_confirm_modify_button'
import TagButtonDeletableChunk from '../molecule_tag_button_chunk/index.deletable'

interface Props {
  wordId: string
}

const WordCardEditingMode: FC<Props> = ({ wordId }) => {
  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Stack spacing={1.5}>
            <LanguageSelector wordId={wordId} useVerticalStyle />
            <WordCardEditingTextField wordKey={`term`} wordId={wordId} />
            <WordCardEditingTextField
              wordKey={`pronunciation`}
              wordId={wordId}
            />
            <WordCardEditingTextField wordKey={`definition`} wordId={wordId} />
            <WordCardEditingTextField
              wordKey={`subDefinition`}
              wordId={wordId}
            />
            <WordCardEditingTextField wordKey={`example`} wordId={wordId} />
            <WordCardEditingTextField wordKey={`exampleLink`} wordId={wordId} />
            <TagButtonDeletableChunk wordId={wordId} />
          </Stack>
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={wordId} />
          <WordCardDeleteButton wordId={wordId} />
          <Box flexGrow={1} />
          <WordCardConfirmModifyButton wordId={wordId} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardEditingMode
