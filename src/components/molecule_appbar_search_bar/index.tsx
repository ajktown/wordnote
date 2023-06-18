import { FC, Fragment, useCallback, useEffect } from 'react'
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

  const onApplyChange = useCallback(
    async (searchInput: string) => {
      try {
        await handleGetWords({
          searchInput: searchInput ? searchInput : undefined,
        })
      } catch {}
    },
    [handleGetWords],
  )

  useEffect(() => {
    onApplyChange(searchInput)
  }, [searchInput, onApplyChange])

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
