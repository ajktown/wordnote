import { FC, useEffect } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import {
  searchByWordIdState,
  searchInputState,
  searchedWordsByWordIdState,
} from '@/recoil/words/searchInput.state'
import WordCardsChunkNoWordsFound from '../organism_word_card_chunk/index.no_words_found'
import {
  Card,
  CardActions,
  CardContent,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material'
import StyledSuspense from '@/organisms/StyledSuspense'
import WordCardExamplePart from '../atom_word_card_parts/index.example'
import { useSearchedWordsByWordId } from '@/hooks/words/use-searched-words-by-word-id.hook'
import TagButtonChunk from '../molecule_tag_button_chunk'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { wordsFamily } from '@/recoil/words/words.state'
import WordCardTermAndPronunciationPart from '../atom_word_card_parts/index.term-and-pronunciation'
import WordCardDefinitionPart from '../atom_word_card_parts/index.definition'

const WordCardSearchDialog: FC = () => {
  const searchingWordId = useRecoilValue(searchByWordIdState)
  const words = useRecoilValue(searchedWordsByWordIdState)
  const onGetSearchedWordsByWordId = useSearchedWordsByWordId(searchingWordId)

  const onClose = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(searchByWordIdState)
        reset(searchedWordsByWordIdState)
      },
    [],
  )

  const onClickOpenMainSearch = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        if (!searchingWordId) return // fatal error; but no error yet

        // get word:
        const word = await snapshot.getPromise(wordsFamily(searchingWordId))
        if (!word) return // fatal error; but no error yet

        // set word:
        set(searchInputState, word.term)

        // finally:
        onClose()
      },
    [searchingWordId, onClose],
  )

  // run onGetSearchedWordsByWordId
  useEffect(() => {
    onGetSearchedWordsByWordId()
  }, [onGetSearchedWordsByWordId])

  if (!searchingWordId) return null // dialog is not open
  if (words === undefined)
    return (
      <StyledDialog onClose={onClose}>
        <p>Loading...</p>
      </StyledDialog>
    )

  if (words === null)
    return (
      <StyledDialog onClose={onClose}>
        <p>Failed to load</p>
      </StyledDialog>
    )

  if (words.length === 0) return <WordCardsChunkNoWordsFound />

  return (
    <StyledDialog onClose={onClose}>
      <DialogContent>
        <Stack spacing={1} alignItems={`center`}>
          <Typography variant="caption">
            {words.length} {words.length === 1 ? `word card` : `word cards`}
          </Typography>
          <StyledTextButtonAtom
            title="Open main search for this word instead"
            onClick={onClickOpenMainSearch}
          />
          {words.map((word) => (
            <StyledSuspense key={word.id}>
              <Card style={{ width: `100%`, borderRadius: 9 }}>
                <CardContent>
                  <WordCardTermAndPronunciationPart word={word} />
                  <WordCardDefinitionPart word={word} />
                  <WordCardExamplePart word={word} />
                </CardContent>
                <CardActions>
                  <TagButtonChunk word={word} clickDisabled />
                </CardActions>
              </Card>
            </StyledSuspense>
          ))}
        </Stack>
      </DialogContent>
    </StyledDialog>
  )
}

export default WordCardSearchDialog
