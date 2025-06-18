import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useRecoilCallback } from 'recoil'
import { dialogSearchedTermState } from '@/states/words/searchInput.state'
import { ISharedWord } from '@/api/words/interfaces'
interface Props {
  word: ISharedWord
}
const WordCardSearchThisWordButtonPart: FC<Props> = ({ word }) => {
  const trimmedWord = word.term.trim()

  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(dialogSearchedTermState, trimmedWord)
      },
    [trimmedWord],
  )

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SearchIcon />}
      isDisabled={!trimmedWord}
      hoverMessage={{
        title: `Open Search Dialog with this word`,
      }}
    />
  )
}

export default WordCardSearchThisWordButtonPart
