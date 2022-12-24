// TODO: Not sure if this is a correct place to store the search found helper, but okay.

import StyledTextButtonAtom from '@/atoms/StyledTextButton'
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
  const filteredWordIdLength = useMemo(() => filteredWordIds.length, [filteredWordIds])
  const resultsPluralFrom = useMemo(() => filteredWordIdLength === 1 ? "result" : "results", [filteredWordIdLength])

  if (!searchInput) return null

  return (
    <Stack>
      <Typography>
        {`Your search matched "${filteredWordIdLength}" ${resultsPluralFrom}`}
      </Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        handleClick={resetSearchInput}
      />
    </Stack>
  )
}

export default WordCardChunkSearchFound
