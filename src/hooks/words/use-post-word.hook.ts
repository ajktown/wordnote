import { postWordApi } from '@/api/words/post-word.api'
import { PostWordReqDto } from '@/api/words/interfaces'
import { wordIdsState, wordsFamily } from '@/states/words/words.state'
import { useRecoilCallback } from 'recoil'
import { semestersState } from '@/states/words/semesters.state'
import { useActionGroupDailyPostWordChallengeApi } from '../action-groups/use-action-group-daily-post-word-challenge.api'
import { useState } from 'react'

type UsePostWord = [
  boolean,
  (newWord: PostWordReqDto) => Promise<void>, // handlePostWord
]

export const usePostWord = (): UsePostWord => {
  const [loading, setLoading] = useState(false)
  const onGetActionGroups = useActionGroupDailyPostWordChallengeApi()

  const onPostWord = useRecoilCallback(
    ({ set, snapshot }) =>
      async (newWord: PostWordReqDto) => {
        try {
          setLoading(true)
          const [{ postedWord, semesters }] = await postWordApi(newWord)

          const wordIds = await snapshot.getPromise(wordIdsState)
          set(wordIdsState, [postedWord.id, ...wordIds])
          set(wordsFamily(postedWord.id), postedWord)
          set(semestersState, semesters.semesters)

          // TODO: Add daysAgo 0 to the latest semester
        } finally {
          setLoading(false)
          onGetActionGroups()
        }
      },
    [onGetActionGroups],
  )

  return [loading, onPostWord]
}
