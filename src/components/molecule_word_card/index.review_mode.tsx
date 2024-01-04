import { FC, useCallback, useState } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData } from '@/api/words/interfaces'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import StyledVisibilityAtom from '@/atoms/StyledVisibility'
import { selectedWordIdForDialogState } from '@/recoil/words/words.state'
import { useSetRecoilState } from 'recoil'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import EditIcon from '@mui/icons-material/Edit'
interface Props {
  word: WordData
}

const WordCardReviewMode: FC<Props> = ({ word }) => {
  const { id } = word
  const [isPeekMode, setPeekMode] = useState(false)
  const setSelectedWordIdForDialog = useSetRecoilState(
    selectedWordIdForDialogState,
  )

  const onClickOpenEditDialog = useCallback(() => {
    setSelectedWordIdForDialog(id)
  }, [id, setSelectedWordIdForDialog])

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {isPeekMode ? word.term : `???`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isPeekMode ? word.pronunciation : `???`}
          </Typography>
          <Typography variant="body2">
            {word.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={word} reviewMode={!isPeekMode} />
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={word.id} />
          <StyledVisibilityAtom
            isVisible={!isPeekMode}
            onClick={() => setPeekMode(!isPeekMode)}
            visibleHoverMessage={`Peek this Wordcard`}
          />
          <StyledIconButtonAtom
            jsxElementButton={<EditIcon fontSize="small" />}
            onClick={onClickOpenEditDialog}
          />
          <TagButtonChunk wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardReviewMode
