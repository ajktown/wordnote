import { postWordApi } from '@/api/words/post-word.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { wordIdsState } from '@/recoil/words/words.state'
import { semestersState } from '@/recoil/words/semesters.state'
import { useState } from 'react'

type UsePostWordFromUndo = [
  boolean,
  () => Promise<void>, // handlePostWordFromUndo
]

export const usePostWordFromUndo = (
  undoingWordId: string,
): UsePostWordFromUndo => {
  const [loading, setLoading] = useState(false)

  const onPostWordFromUndo = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        try {
          setLoading(true)
          const word = await snapshot.getPromise(wordsFamily(undoingWordId))
          if (!word) return // failed to re-post word

          const [{ postedWord, semesters }] = await postWordApi(word)
          const wordIds = (await snapshot.getPromise(wordIdsState)).map(
            (id) => {
              if (id === undoingWordId) return postedWord.id
              return id
            },
          )

          set(wordIdsState, wordIds)
          set(wordsFamily(postedWord.id), postedWord)
          set(semestersState, semesters.semesters)
        } finally {
          setLoading(false)
        }
      },
    [undoingWordId],
  )

  return [loading, onPostWordFromUndo]
}
