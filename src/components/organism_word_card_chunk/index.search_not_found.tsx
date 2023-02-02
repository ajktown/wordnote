import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { parseInputIntoWordLambda } from '@/lambdas/parse-input-into-word.lambda'
import { searchInputState } from '@/recoil/searchInput.state'
import { Typography, Stack } from '@mui/material'
import { FC, useCallback } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { usePostWord } from '@/hooks/words/use-post-word.hook'

const WordCardChunkSearchNotFound: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const onResetSearchInput = useResetRecoilState(searchInputState)
  const setSearchInput = useSetRecoilState(searchInputState)
  const postWord = usePostWord()

  const handleClickPostWord = useCallback(() => {
    const parsed = parseInputIntoWordLambda(searchInput)
    postWord(parsed)
    setSearchInput(parsed.term)
  }, [searchInput, postWord, setSearchInput])

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
