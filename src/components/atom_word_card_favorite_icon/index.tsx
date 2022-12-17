import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import NotFavoriteWordIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/words.interface'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord()

  const handleClickFavoriteIcon = useCallback(
    async (givenWord: WordData) => {
      await putWord(wordId, { isFavorite: !givenWord.isFavorite })
    },
    [putWord],
  )

  if (word === null) return null

  return (
    <StyledIconButtonAtom
      handleClick={() => handleClickFavoriteIcon(word)}
      jsxElementButton={
        <FavoriteWordIcon style={{ color: word.isFavorite ? `FF0000`: undefined  /* Red */ }} />
      }
    />
  )
}

export default WordCardFavoriteIcon
