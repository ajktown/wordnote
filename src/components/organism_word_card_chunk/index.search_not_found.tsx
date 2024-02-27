import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { parseInputIntoWordLambda } from '@/lambdas/parse-input-into-word.lambda'
import { searchInputState } from '@/recoil/words/searchInput.state'
import { Typography, Stack } from '@mui/material'
import { FC, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { usePostWord } from '@/hooks/words/use-post-word.hook'
import { useResetSearchInput } from '@/hooks/words/use-reset-search-input.hook'

const WordCardChunkSearchNotFound: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const [, onResetSearchInput] = useResetSearchInput()
  const setSearchInput = useSetRecoilState(searchInputState)
  const [, onPostWord] = usePostWord()

  const handleClickPostWord = useCallback(() => {
    const parsed = parseInputIntoWordLambda(searchInput)
    onPostWord(parsed)
    setSearchInput(parsed.term)
  }, [searchInput, onPostWord, setSearchInput])

  return (
    <Stack>
      <Typography>
        {`Your search `}
        <span style={{ fontWeight: 700 }}>{`- ${searchInput} - `}</span>
        {`did not match any documents`}
      </Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        onClick={onResetSearchInput}
      />
      <StyledTextButtonAtom
        title={`Or create a new word with "${searchInput}"`}
        onClick={handleClickPostWord}
      />
    </Stack>
  )
}

export default WordCardChunkSearchNotFound
