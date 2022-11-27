import { WordData } from '@/api/words/words.interface'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import NotFavoriteWordIcon from '@mui/icons-material/FavoriteBorderTwoTone'

interface Props {
  word: WordData
}
const WordCardFavoriteIcon: FC<Props> = ({ word }) => {
  if (word.isFavorite)
    return (
      <StyledIconButtonAtom
        jsxElementButton={<FavoriteWordIcon style={{ color: `FF0000` }} />}
      />
    )

  return <StyledIconButtonAtom jsxElementButton={<NotFavoriteWordIcon />} />
}

export default WordCardFavoriteIcon
