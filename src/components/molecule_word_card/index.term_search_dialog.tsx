import { FC, useEffect } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil'
import {
  dialogSearchedTermState,
  searchInputState,
  dialogSearchedWordsState as termDialogSearchedWordsState,
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
import { useDialogSearchedWords } from '@/hooks/words/use-searched-words-by-word-id.hook'
import TagButtonChunk from '../molecule_tag_button_chunk'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { wordsFamily } from '@/recoil/words/words.state'
import WordCardTermAndPronunciationPart from '../atom_word_card_parts/index.term-and-pronunciation'
import WordCardDefinitionPart from '../atom_word_card_parts/index.definition'
import StyledTextField from '@/atoms/StyledTextField'

/**
 * Renders a dialog that shows word cards that are searched by IWordData's term
 */

const WordCardTermSearchDialog: FC = () => {
  const [searchedTerm, setSearchedTerm] = useRecoilState(
    dialogSearchedTermState,
  )
  const searchedWords = useRecoilValue(termDialogSearchedWordsState)
  const onGetDialogSearchedWords = useDialogSearchedWords(searchedTerm)

  const onClose = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(dialogSearchedTermState)
        reset(termDialogSearchedWordsState)
      },
    [],
  )

  const onClickOpenMainSearch = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        if (!searchedTerm) return // fatal error; but no error yet

        // get word:
        const word = await snapshot.getPromise(wordsFamily(searchedTerm))
        if (!word) return // fatal error; but no error yet

        // set word:
        set(searchInputState, word.term)

        // finally:
        onClose()
      },
    [searchedTerm, onClose],
  )

  // run onGetSearchedWordsByWordId
  useEffect(() => {
    onGetDialogSearchedWords()
  }, [onGetDialogSearchedWords])

  if (searchedTerm === null) return null // dialog is not open
  if (searchedWords === undefined)
    return (
      <StyledDialog onClose={onClose}>
        <p>Loading...</p>
      </StyledDialog>
    )

  if (searchedWords === null)
    return (
      <StyledDialog onClose={onClose}>
        <p>Failed to load</p>
      </StyledDialog>
    )

  return (
    <StyledDialog onClose={onClose}>
      <DialogContent>
        <Stack spacing={1} alignItems={`center`}>
          <Typography variant="caption">
            {searchedWords.length}
            {` `}
            {searchedWords.length === 1 ? `word card` : `word cards`}
          </Typography>
          <StyledTextField
            value={searchedTerm}
            onChange={(v) => setSearchedTerm(v)}
          />
          <StyledTextButtonAtom
            title="Open main search for this word instead"
            onClick={onClickOpenMainSearch}
          />
          {searchedWords.length === 0 && <WordCardsChunkNoWordsFound />}
          {searchedWords.map((word) => (
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

export default WordCardTermSearchDialog
