import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  tempFavoriteWordIdsState,
  wordsFamily,
} from '@/recoil/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/interfaces'
import { isFavoriteClickedSelector } from '@/recoil/words/tags.selectors'

type UsePutWord = [undefined | null | WordData, () => Promise<void>]
export const usePutWordFavorite = (wordId: string): UsePutWord => {
  const [tempIds, setTempIds] = useRecoilState(tempFavoriteWordIdsState)
  const word = useRecoilValue(wordsFamily(wordId))
  const isFavoriteClicked = useRecoilValue(isFavoriteClickedSelector)

  const handlePutWord = usePutWord(wordId)

  const onClickFavoriteIcon = useCallback(async () => {
    if (word == null) return

    const modifyingTo = !word.isFavorite
    await handlePutWord({ isFavorite: modifyingTo })

    if (!isFavoriteClicked) return
    if (modifyingTo) setTempIds([...tempIds].filter((id) => id !== word.id))
    else setTempIds([...tempIds, word.id])
  }, [isFavoriteClicked, word, handlePutWord, tempIds, setTempIds])

  return [word, onClickFavoriteIcon]
}
