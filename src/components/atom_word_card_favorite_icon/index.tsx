import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)

  const handleClickFavoriteIcon = useCallback(async () => {
    if (word === null) return

    await putWord({ isFavorite: !word.isFavorite })
  }, [word, putWord])

  if (word === null) return null

  return (
    <StyledIconButtonAtom
      onClickCallback={handleClickFavoriteIcon}
      jsxElementButton={
        <FavoriteWordIcon
          style={{ color: word.isFavorite ? `FF0000` /* Red */ : undefined }}
        />
      }
    />
  )
}

export default WordCardFavoriteIcon
