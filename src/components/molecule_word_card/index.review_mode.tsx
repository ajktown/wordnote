import { FC, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
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
import WordCardSearchThisWordButtonPart from '../atom_word_card_parts/index.search-this-word'
import { useWindowSize } from 'react-use'
import WordCardTermAndPronunciationPart from '../atom_word_card_parts/index.term-and-pronunciation'
import WordCardDefinitionPart from '../atom_word_card_parts/index.definition'
interface Props {
  word: WordData
}

const WordCardReviewMode: FC<Props> = ({ word }) => {
  const { id } = word
  const [isPeekMode, setPeekMode] = useState(false)
  const { width } = useWindowSize()

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
          {isPeekMode && <WordCardTermAndPronunciationPart word={word} />}
          {!isPeekMode && (
            <Typography variant="h5" component="div">
              {`???`}
            </Typography>
          )}
          <WordCardDefinitionPart word={word} hideSubDefinition={!isPeekMode} />
          <WordCardExamplePart word={word} reviewMode={!isPeekMode} />
        </CardContent>
        <CardActions>
          <Stack direction={width > 622 ? `row` : `column`} alignItems={`left`}>
            <Stack
              direction={width > 440 ? `row` : `column`}
              alignItems={`left`}
            >
              <Stack direction={`row`} alignItems={`center`}>
                <WordCardFavoriteIcon wordId={word.id} />
                <StyledVisibilityAtom
                  isVisible={!isPeekMode}
                  onClick={() => setPeekMode(!isPeekMode)}
                  visibleHoverMessage={`Peek this word card`}
                />
                {isPeekMode && !word.isArchived && (
                  // because it kind of does not make sense to archive/unarchive when you cannot fully see the word card
                  <WordCardArchiveButtonPart wordId={word.id} />
                )}
                {isPeekMode && word.isArchived && (
                  // because it kind of does not make sense to archive/unarchive when you cannot fully see the word card
                  <WordCardUnarchiveButtonPart wordId={word.id} />
                )}
                <WordCardSearchThisWordButtonPart wordId={word.id} />
                <WordCardShareButtonPart wordId={word.id} />
              </Stack>
              <TagButtonChunk word={word} />
            </Stack>
            <DictLinkButtonChunk wordId={word.id} />
          </Stack>
        </CardActions>
      </Card>
    </StyledSuspense>
  )
}

export default WordCardReviewMode
