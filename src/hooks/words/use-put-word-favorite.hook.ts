import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  tempFavoriteWordIdsState,
  wordsFamily,
} from '@/states/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/interfaces'
import { isFavoriteClickedSelector } from '@/states/words/words.selectors'

type UsePutWord = [undefined | null | WordData, () => Promise<void>]
export const usePutWordFavorite = (wordId: string): UsePutWord => {
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)
  const word = useRecoilValue(wordsFamily(wordId))
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const [, onPutWord] = usePutWord(wordId)

  const onPutWordFavorite = useCallback(async () => {
    if (word == null) return

    const modifyingTo = !word.isFavorite
    await onPutWord({ isFavorite: modifyingTo })

    if (!isFavoriteClicked) return
    if (modifyingTo) setTempIds([...tempIds].filter((id) => id !== word.id))
    else setTempIds([...tempIds, word.id])
  }, [isFavoriteClicked, word, onPutWord, tempIds, setTempIds])

  return [word, onPutWordFavorite]
}
