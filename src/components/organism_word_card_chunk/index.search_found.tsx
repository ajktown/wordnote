// TODO: Not sure if this is a correct place to store the search found helper, but okay.

import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { searchInputState } from '@/recoil/searchInput.state'
import { filteredWordIdsState } from '@/recoil/words.state'
import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

const WordCardChunkSearchFound: FC = () => {
  const searchInput = useRecoilValue(searchInputState)
  const setSearchInput = useResetRecoilState(searchInputState)
  const filteredWordIds = useRecoilValue(filteredWordIdsState)

  if (!searchInput) return null

  return (
    <Stack>
      <Typography>
        {`Your search matched "${filteredWordIds.length}" result(s)`}
      </Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        handleClick={setSearchInput}
      />
    </Stack>
  )
}

export default WordCardChunkSearchFound
