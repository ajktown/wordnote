import { WordData } from '@/api/words/words.interface'
import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import FavoriteWordIcon from '@mui/icons-material/FavoriteTwoTone'
import NotFavoriteWordIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import { useRecoilState } from 'recoil'
import { deprecatedWordsState } from '@/recoils/state_atoms/words.state'

interface Props {
  word: WordData
}
const WordCardFavoriteIcon: FC<Props> = ({ word }) => {
  const [words, setWords] = useRecoilState(deprecatedWordsState)

  const handleClickFavoriteIcon = () => {
    const foundIndex = words.findIndex((el) => el.id === word.id)
    if (foundIndex === -1) return

    const modifyingWord = words[foundIndex]

    const copiedWords = [...words]
    copiedWords.splice(foundIndex, 1, {
      ...modifyingWord,
      isFavorite: !modifyingWord.isFavorite,
    })
    setWords(copiedWords)
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
