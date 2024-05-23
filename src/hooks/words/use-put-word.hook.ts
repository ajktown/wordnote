import { patchWordByIdApi } from '@/api/words/patch-word-by-id.api'
import { WordDataModifiable } from '@/api/words/interfaces'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useState } from 'react'

type UsePutWord = [
  boolean, // loading
  (modified: Partial<WordDataModifiable>) => Promise<void>, // onPutWord
]

export const usePutWord = (wordId: string): UsePutWord => {
  const [loading, setLoading] = useState(false)

  const onPutWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (modified: Partial<WordDataModifiable>) => {
        try {
          setLoading(true)
          const wordData = await snapshot.getPromise(wordsFamily(wordId))
          if (wordData == null) return

          const [modifiedWord] = await patchWordByIdApi(wordId, modified)
          set(wordsFamily(wordId), modifiedWord)
        } finally {
          setLoading(false)
        }
      },
    [],
  )

  return [loading, onPutWord]
}
