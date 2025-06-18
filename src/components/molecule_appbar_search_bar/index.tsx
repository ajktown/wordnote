import { FC, Fragment, useCallback } from 'react'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import StyledTextField from '@/atoms/StyledTextField'
import StyledIconButtonX from '@/atoms/StyledIconButtonX'
import { useResetSearchInput } from '@/hooks/words/use-reset-search-input.hook'
import { useRecoilState } from 'recoil'
import { searchInputState } from '@/states/words/searchInput.state'
import { useWords } from '@/hooks/words/use-words.hook'
import { useWait } from '@/hooks/use-wait.hook'
import StyledCircularLoading from '@/atoms/StyledCircularLoading'

const PRIVATE_DEFAULT_SEARCH_BEGIN_SECONDS = 0.5 // seconds
const AppbarSearchBar: FC = () => {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState)
  const [, onGetWords] = useWords()
  const [, onResetSearchInput] = useResetSearchInput()

  const onApplyChange = useCallback(async () => {
    try {
      await onGetWords({
        searchInput: searchInput ? searchInput : undefined,
      })
    } catch {}
  }, [searchInput, onGetWords])

  const isLoading = useWait(onApplyChange, PRIVATE_DEFAULT_SEARCH_BEGIN_SECONDS)

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
              {isLoading && <StyledCircularLoading />}
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
