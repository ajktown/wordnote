import { FC } from 'react'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { searchInputState } from '@/recoil/searchInput.state'
import StyledTextField from '@/atoms/StyledTextField'
import XButton from '../atom_x_button'

const AppbarSearchBar: FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const resetSearchInput = useResetRecoilState(searchInputState)

  return (
    <Box width={250}>
      <StyledTextField
        value={searchInput}
        onChange={setSearchInput}
        label={`Search...`}
        usePlaceholder
        buttons={{
          left: <SearchIcon />,
          right: searchInput && (
            <XButton onClick={resetSearchInput} hoverMessage={`Reset`} />
          ),
        }}
      />
    </Box>
  )
}

export default AppbarSearchBar
