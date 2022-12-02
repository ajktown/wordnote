import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import NotFavoriteWordIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import { useRecoilState } from 'recoil'
import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import { wordsFamily } from '@/recoil/words.state'

interface Props {
  wordId: string
}
const WordCardFavoriteIcon: FC<Props> = ({ wordId }) => {
  const [word, setWord] = useRecoilState(wordsFamily(wordId))

  if (word === null) return null

  const handleClickFavoriteIcon = async () => {
    const modifiedIsFavorite = !word.isFavorite
    await putWordByIdApi(wordId, {
      isFavorite: modifiedIsFavorite,
    })
    setWord({ ...word, isFavorite: modifiedIsFavorite })
  }

  if (word.isFavorite)
    return (
      <StyledIconButtonAtom
        handleClick={() => handleClickFavoriteIcon()}
        jsxElementButton={
          <FavoriteWordIcon style={{ color: `FF0000` /* Red */ }} />
        }
      />
    )

  return (
    <StyledIconButtonAtom
      handleClick={() => handleClickFavoriteIcon()}
      jsxElementButton={<NotFavoriteWordIcon />}
    />
  )
}

export default WordCardFavoriteIcon
