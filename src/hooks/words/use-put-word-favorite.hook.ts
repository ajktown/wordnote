import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tempFavoriteWordIdsState, wordsFamily } from '@/recoil/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { isFavoriteClickedState } from '@/recoil/favorites.state'
import { WordData } from '@/api/words/words.interface'

type UsePutWord = [null | WordData, () => Promise<void>]
export const usePutWordFavorite = (wordId: string): UsePutWord => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedState)

  const onClickFavoriteIcon = useCallback(async () => {
    if (word === null) return

    const modifyingTo = !word.isFavorite
    await putWord({ isFavorite: modifyingTo })

    if (!isFavoriteClicked) return
    if (modifyingTo) setTempIds([...tempIds].filter((id) => id !== word.id))
    else setTempIds([...tempIds, word.id])
  }, [isFavoriteClicked, word, putWord, tempIds, setTempIds])

  return [word, onClickFavoriteIcon]
}
