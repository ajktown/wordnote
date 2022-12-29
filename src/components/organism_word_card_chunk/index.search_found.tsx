// TODO: Not sure if this is a correct place to store the search found helper, but okay.

import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { stringCaseHandler } from '@/handlers/string-case.handler'
import { searchInputState } from '@/recoil/searchInput.state'
import { filteredWordIdsState } from '@/recoil/words.state'
import { Typography, Stack } from '@mui/material'
import { FC, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const WordCardChunkSearchFound: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const resetSearchInput = useResetRecoilState(searchInputState)
  const filteredWordIds = useRecoilValue(filteredWordIdsState)

  // TODO: Lol. troll code.
  const resultsPluralForm = useMemo(
    () => stringCaseHandler.toPlural(filteredWordIds.length, `result`, `results`),
    [filteredWordIds],
  )

  if (!searchInput) return null

  return (
    <Stack>
      <Typography>
        {`Your search matched ${resultsPluralForm}.`}
      </Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        onClick={resetSearchInput}
      />
    </Stack>
  )
}

export default WordCardChunkSearchFound
