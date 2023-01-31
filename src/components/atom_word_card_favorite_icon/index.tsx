import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tempFavoriteWordIdsState, wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { isFavoriteClickedState } from '@/recoil/favorites.state'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedState)

  const handleClickFavoriteIcon = useCallback(async () => {
    if (word === null) return

    const modifyingTo = !word.isFavorite
    await putWord({ isFavorite: modifyingTo })

    if (!isFavoriteClicked) return
    if (modifyingTo) setTempIds([...tempIds].filter((id) => id !== word.id))
    else setTempIds([...tempIds, word.id])
  }, [isFavoriteClicked, word, putWord, tempIds, setTempIds])

  if (word === null) return null

  return (
    <StyledIconButtonAtom
      onClick={handleClickFavoriteIcon}
      jsxElementButton={
        <FavoriteWordIcon
          style={{ color: word.isFavorite ? `FF0000` /* Red */ : undefined }}
        />
      }
    />
  )
}

export default WordCardFavoriteIcon
