import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  tempFavoriteWordIdsState,
  wordsFamily,
} from '@/recoil/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { isFavoriteClickedState } from '@/recoil/words/favorites.state'
import { WordData } from '@/api/words/words.interface'

type UsePutWord = [null | WordData, () => Promise<void>]
export const usePutWordFavorite = (wordId: string): UsePutWord => {
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)
  const word = useRecoilValue(wordsFamily(wordId))
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedState)

  const handlePutWord = usePutWord(wordId)

  const onClickFavoriteIcon = useCallback(async () => {
    if (word === null) return

    const modifyingTo = !word.isFavorite
    await handlePutWord({ isFavorite: modifyingTo })

    if (!isFavoriteClicked) return
    if (modifyingTo) setTempIds([...tempIds].filter((id) => id !== word.id))
    else setTempIds([...tempIds, word.id])
  }, [isFavoriteClicked, word, handlePutWord, tempIds, setTempIds])

  return [word, onClickFavoriteIcon]
}
