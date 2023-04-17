import { FC, Fragment, useEffect } from 'react'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import StyledTextField from '@/atoms/StyledTextField'
import StyledIconButtonX from '@/atoms/StyledIconButtonX'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'
import { useResetSearchInput } from '@/hooks/words/use-reset-search-input.hook'
import { useRecoilState } from 'recoil'
import { searchInputState } from '@/recoil/words/searchInput.state'

const AppbarSearchBar: FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const [, handleGetWordIds] = useWordIds()
  const [, onResetSearchInput] = useResetSearchInput()

  useEffect(() => {
    handleGetWordIds()
  }, [searchInput, handleGetWordIds])

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
            <Fragment>
              <StyledIconButtonX
                onClick={onResetSearchInput}
                hoverMessage={`Reset`}
              />
            </Fragment>
          ),
        }}
      />
    </Box>
  )
}

export default AppbarSearchBar
