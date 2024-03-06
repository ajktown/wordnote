import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useRecoilCallback } from 'recoil'
import { searchByWordIdState } from '@/recoil/words/searchInput.state'
interface Props {
  wordId: string
}
const WordCardSearchThisWordButtonPart: FC<Props> = ({ wordId }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(searchByWordIdState, wordId)
      },
    [wordId],
  )

  return (
    <StyledIconButtonAtom
      onClick={onClick}
      jsxElementButton={<SearchIcon />}
      hoverMessage={{
        title: `Open Search Dialog with this word`,
      }}
    />
  )
}

export default WordCardSearchThisWordButtonPart
