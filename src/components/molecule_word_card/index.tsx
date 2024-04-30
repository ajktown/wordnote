import { FC } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
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
import { useWindowSize } from 'react-use'
import WordCardTermAndPronunciationPart from '../atom_word_card_parts/index.term-and-pronunciation'
import WordCardDefinitionPart from '../atom_word_card_parts/index.definition'

interface Props {
  wordId: string
  editingMode?: boolean
}
const WordCard: FC<Props> = ({ wordId, editingMode }) => {
  const { width } = useWindowSize()
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
          <WordCardTermAndPronunciationPart word={word} />
          <WordCardDefinitionPart word={word} />
          <WordCardExamplePart word={word} />
        </CardContent>
        <CardActions>
          <Stack direction={width > 630 ? `row` : `column`} alignItems={`left`}>
            <Stack
              direction={width > 440 ? `row` : `column`}
              alignItems={`left`}
            >
              <Stack direction={`row`} alignItems={`center`}>
                <WordCardFavoriteIcon wordId={wordId} />
                <WordCardDeleteButton wordId={wordId} />
                {!word.isArchived && (
                  <WordCardArchiveButtonPart wordId={wordId} />
                )}
                {word.isArchived && (
                  <WordCardUnarchiveButtonPart wordId={wordId} />
                )}
                <WordCardSearchThisWordButtonPart wordId={wordId} />
                <WordCardShareButtonPart wordId={wordId} />
              </Stack>
              <TagButtonChunk word={word} />
            </Stack>
            <DictLinkButtonChunk wordId={wordId} />
          </Stack>
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCard
