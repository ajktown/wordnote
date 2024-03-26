import { useRecoilCallback } from 'recoil'
import { useWords } from './use-words.hook'
import { useSemesters } from '../semesters/use-semesters.hook'
import { getWordsApi } from '@/api/words/get-words.api'
import { wordIdsState, wordsFamily } from '@/recoil/words/words.state'
import { useState } from 'react'

/**
 * Get every word from every semester with isFavorite=true only
 */
type UseWordsByFavorite = [boolean, () => Promise<void>]
export const useWordsByFavorite = (): UseWordsByFavorite => {
  const [loading, setLoading] = useState(false)
  const [, onGetWords] = useWords()
  const onGetSemesters = useSemesters()

  const onGetWordsByFavorite = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          setLoading(true)
          const [data] = await getWordsApi({ isFavorite: true })
          data.words.forEach((word) => {
            set(wordsFamily(word.id), word)
          })
          set(wordIdsState, data.wordIds)
        } finally {
          setLoading(false)
        }
      },
    [onGetSemesters, onGetWords],
  )

  return [loading, onGetWordsByFavorite]
}
