import { FC } from 'react'
import { usePutWordFavorite } from '@/hooks/words/use-put-word-favorite.hook'
import StyledIconButtonFavorite from '@/atoms/StyledIconButtonFavorite'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const [word, onPutWordFavorite] = usePutWordFavorite(wordId)

  if (!word) return null

  return (
    <StyledIconButtonFavorite
      isClicked={word.isFavorite}
      onClick={onPutWordFavorite}
    />
  )
}

export default WordCardFavoriteIcon
