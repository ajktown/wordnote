import { FC, Fragment, useEffect } from 'react'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import StyledTextField from '@/atoms/StyledTextField'
import StyledIconButtonX from '@/atoms/StyledIconButtonX'
import { useResetSearchInput } from '@/hooks/words/use-reset-search-input.hook'
import { useRecoilState } from 'recoil'
import { searchInputState } from '@/recoil/words/searchInput.state'
import { useWords } from '@/hooks/words/use-words.hook'

const AppbarSearchBar: FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const [, handleGetWords] = useWords()
  const [, onResetSearchInput] = useResetSearchInput()

  useEffect(() => {
    const handle = async () => {
      try {
        await handleGetWords({
          searchInput: searchInput ? searchInput : undefined,
        })
      } catch {}
    }
    handle()
  }, [searchInput, handleGetWords])

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
