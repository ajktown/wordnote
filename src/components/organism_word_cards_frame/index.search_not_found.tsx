import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { searchInputState } from '@/recoils/state_atoms/searchInput.sa'
import { Typography, Stack } from '@mui/material'
import { FC } from 'react'
import { useRecoilState } from 'recoil'

const WordCardsFrameSearchNotFound: FC  = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)

  return (
    <Stack>
      <Typography>
        {`Your search `}
        <span style={{ fontWeight: 700 }}>
          {`- ${searchInput} - `}
        </span>
        {`did not match any documents`}
      </Typography>
      <StyledTextButtonAtom
        title="Clear Search Input"
        handleClick={() => setSearchInput("")}
      />
    </Stack>
  )
}

export default WordCardsFrameSearchNotFound