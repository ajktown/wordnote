import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tempFavoriteWordIdsState, wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)

  const handleClickFavoriteIcon = useCallback(async () => {
    if (word === null) return

    const modifyingTo = !word.isFavorite
    await putWord({ isFavorite: modifyingTo })

    setTempIds([...tempIds, word.id])
  }, [word, putWord, tempIds, setTempIds])

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
