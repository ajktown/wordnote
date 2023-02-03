import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import { usePutWordFavorite } from '@/hooks/words/use-put-word-favorite.hook'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const [word, handlePutWordFavorite] = usePutWordFavorite(wordId)

  if (!word) return null

  return (
    <StyledIconButtonAtom
      onClick={handlePutWordFavorite}
      jsxElementButton={
        <FavoriteWordIcon
          style={{ color: word.isFavorite ? `FF0000` /* Red */ : undefined }}
        />
      }
    />
  )
}

export default WordCardFavoriteIcon
