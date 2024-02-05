import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { ISharedWord } from '@/api/words/interfaces'
import { searchInputState } from '@/recoil/words/searchInput.state'
interface Props {
  word: ISharedWord
}
const WordCardSearchThisWordButtonPart: FC<Props> = ({ word }) => {
  const searchInput = useRecoilValue(searchInputState)

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        // go to the top of page, smoothly
        window.scrollTo(0, 0)
        set(searchInputState, word.term.toLowerCase().trim())
      },
    [word],
  )

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SearchIcon />}
      hoverMessage={{
        title: searchInput
          ? `Already searched with "${searchInput}"`
          : `Search this word`,
      }}
      isDisabled={!!searchInput}
    />
  )
}

export default WordCardSearchThisWordButtonPart
