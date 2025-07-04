import { postWordApi } from '@/api/words/post-word.api'
import {
  wordsFamily,
  wordIdsState,
  selectedWordIdForDialogState,
} from '@/states/words/words.state'
import { useRecoilCallback } from 'recoil'
import { semestersState } from '@/states/words/semesters.state'
import { useState } from 'react'
import { useActionGroupDailyPostWordChallengeApi } from '../action-groups/use-action-group-daily-post-word-challenge.api'

type UsePostWordFromUndo = [
  boolean,
  () => Promise<void>, // handlePostWordFromUndo
]

// usePostWordFromUndo cannot use usePostWordHook, as it requires different mechanism
export const usePostWordFromUndo = (
  undoingWordId: string,
): UsePostWordFromUndo => {
  const [loading, setLoading] = useState(false)
  const onGetActionGroupDailyPostWordChallenge =
    useActionGroupDailyPostWordChallengeApi()

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
          // dialog is open, if selectedWordIdForDialogState is not null
          // Why we've implemented this: https://github.com/ajktown/wordnote/issues/111
          if (await snapshot.getPromise(selectedWordIdForDialogState)) {
            set(selectedWordIdForDialogState, postedWord.id)
          }
        } finally {
          setLoading(false)
          onGetActionGroupDailyPostWordChallenge()
        }
      },
    [undoingWordId, onGetActionGroupDailyPostWordChallenge],
  )

  return [loading, onPostWordFromUndo]
}
