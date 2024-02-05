import { FC } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import WordCardDeleted from './index.deleted'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import WordCardUnknown from './index.unknown'
import {
  selectedWordIdForDialogState,
  wordsFamily,
} from '@/recoil/words/words.state'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardEditingMode from './index.editing_mode'
import TagButtonChunk from '../molecule_tag_button_chunk'
import WordCardSkeleton from './index.skeleton'
import DictLinkButtonChunk from '../molecule_dict_link_button_chunk'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import WordCardArchiveButtonPart from '../atom_word_card_parts/index.archive-button'
import WordCardUnarchiveButtonPart from '../atom_word_card_parts/index.unarchive-button'
import {
  isReviewModeState,
  isShowingArchivedState,
} from '@/recoil/preferences/preference.state'
import WordCardReviewMode from './index.review_mode'
import WordCardShareButtonPart from '../atom_word_card_parts/index.share-button'
import WordCardSearchThisWordButtonPart from '../atom_word_card_parts/index.search-this-word'

interface Props {
  wordId: string
  editingMode?: boolean
}
const WordCard: FC<Props> = ({ wordId, editingMode }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const isShowingArchived = useRecoilValue(isShowingArchivedState)

  const isReviewMode = useRecoilValue(isReviewModeState)

  const onClickWordCard = useRecoilCallback(
    ({ set }) =>
      () => {
        !editingMode && set(selectedWordIdForDialogState, wordId)
      },
    [wordId, editingMode],
  )

  if (word === undefined) return <WordCardSkeleton />
  if (word === null) return <WordCardUnknown />
  if (word.isArchived && !isShowingArchived) return null
  if (!word.isArchived && isShowingArchived) return null
  if (word.isDeleted) return <WordCardDeleted wordId={wordId} />
  if (editingMode) return <WordCardEditingMode wordId={wordId} />
  if (isReviewMode) return <WordCardReviewMode word={word} />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent onClick={onClickWordCard}>
          <Typography variant="h5" component="div">
            {word.term}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {word.pronunciation}
          </Typography>
          <Typography variant="body2">
            {word.definition}
            <br />
          </Typography>
          <WordCardExamplePart word={word} />
        </CardContent>
        <CardActions>
          <WordCardFavoriteIcon wordId={wordId} />
          <WordCardDeleteButton wordId={wordId} />
          {!word.isArchived && <WordCardArchiveButtonPart wordId={wordId} />}
          {word.isArchived && <WordCardUnarchiveButtonPart wordId={wordId} />}
          <WordCardSearchThisWordButtonPart word={word} />
          <WordCardShareButtonPart wordId={wordId} />
          <TagButtonChunk wordId={wordId} />
          <DictLinkButtonChunk wordId={wordId} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCard
