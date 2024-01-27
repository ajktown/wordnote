import { FC, useState } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import StyledSuspense from '@/organisms/StyledSuspense'
import { WordData } from '@/api/words/interfaces'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import StyledVisibilityAtom from '@/atoms/StyledVisibility'
import { selectedWordIdForDialogState } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import WordCardArchiveButtonPart from '../atom_word_card_parts/index.archive-button'
import WordCardUnarchiveButtonPart from '../atom_word_card_parts/index.unarchive-button'
import WordCardShareButtonPart from '../atom_word_card_parts/index.share-button'
import DictLinkButtonChunk from '../molecule_dict_link_button_chunk'
interface Props {
  word: WordData
}

const WordCardReviewMode: FC<Props> = ({ word }) => {
  const { id } = word
  const [isPeekMode, setPeekMode] = useState(false)

  const onClickWordCard = useRecoilCallback(
    ({ set }) =>
      () => {
        set(selectedWordIdForDialogState, id)
      },
    [id],
  )

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent onClick={onClickWordCard}>
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
            visibleHoverMessage={`Peek this word card`}
          />
          {isPeekMode && !word.isArchived && (
            <WordCardArchiveButtonPart wordId={word.id} />
          )}
          {isPeekMode && word.isArchived && (
            <WordCardUnarchiveButtonPart wordId={word.id} />
          )}
          {isPeekMode && <WordCardShareButtonPart wordId={word.id} />}
          <TagButtonChunk wordId={word.id} />
          <DictLinkButtonChunk wordId={word.id} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardReviewMode
