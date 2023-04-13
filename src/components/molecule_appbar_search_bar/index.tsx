import { FC } from 'react'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { searchInputState } from '@/recoil/words/searchInput.state'
import StyledTextField from '@/atoms/StyledTextField'
import StyledIconButtonX from '@/atoms/StyledIconButtonX'

// TODO: SearchBar is temporarily disabled.
const AppbarSearchBar: FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const onResetSearchInput = useResetRecoilState(searchInputState)

  return (
    <Box width={250}>
      <StyledTextField
        value={searchInput}
        onChange={setSearchInput}
        disabled
        label={`Search...`}
        usePlaceholder
        buttons={{
          left: <SearchIcon />,
          right: searchInput && (
            <StyledIconButtonX
              onClick={onResetSearchInput}
              hoverMessage={`Reset`}
            />
          ),
        }}
      />
    </Box>
  )
}

export default AppbarSearchBar
