import { FC, useCallback } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import WordCardFavoriteIcon from '../atom_word_card_favorite_icon'
import WordCardDeleteButton from '../atom_word_card_delete_button'
import WordCardDeleted from './index.deleted'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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

interface Props {
  wordId: string
  editingMode?: boolean
}
const WordCard: FC<Props> = ({ wordId, editingMode }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const setSelectedWordIdForDialog = useSetRecoilState(
    selectedWordIdForDialogState,
  )

  const handleClickWordCard = useCallback(() => {
    !editingMode && setSelectedWordIdForDialog(wordId)
  }, [editingMode, wordId, setSelectedWordIdForDialog])

  if (word === undefined) return <WordCardSkeleton />
  if (word === null) return <WordCardUnknown />
  if (word.isDeleted) return <WordCardDeleted wordId={wordId} />
  if (editingMode) return <WordCardEditingMode wordId={wordId} />

  return (
    <StyledSuspense>
      <Card style={{ width: `100%`, borderRadius: 9 }}>
        <CardContent onClick={handleClickWordCard}>
          <Typography variant="h5" component="div">
            {word.term}
          </Typography>
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
          <WordCardFavoriteIcon wordId={wordId} />
          <WordCardDeleteButton wordId={wordId} />
          <TagButtonChunk wordId={wordId} />
          <DictLinkButtonChunk wordId={wordId} />
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCard
