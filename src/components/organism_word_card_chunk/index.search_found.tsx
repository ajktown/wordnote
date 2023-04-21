// TODO: Not sure if this is a correct place to store the search found helper, but okay.

import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { stringCaseHandler } from '@/handlers/string-case.handler'
import { useResetSearchInput } from '@/hooks/words/use-reset-search-input.hook'
import { searchInputState } from '@/recoil/words/searchInput.state'
import { wordIdsState } from '@/recoil/words/words.state'
import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

const WordCardChunkSearchFound: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const [, onResetSearchInput] = useResetSearchInput()
  const wordIds = useRecoilValue(wordIdsState)

  if (!searchInput) return null

  return (
    <Stack>
      <Typography>{`Your search matched ${stringCaseHandler.toPlural(
        wordIds.length,
        `result`,
        `results`,
      )}.`}</Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        onClick={onResetSearchInput}
      />
    </Stack>
  )
}

export default WordCardChunkSearchFound
