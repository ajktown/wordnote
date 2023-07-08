import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/interfaces'
import { wordIdsState, wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { semestersState } from '@/recoil/words/semesters.state'

type UsePostWord = (newWord: WordData) => Promise<void> // handlePostWord

export const usePostWord = (): UsePostWord => {
  const handlePostWord = useRecoilCallback(
    ({ set, snapshot }) =>
      async (newWord: WordData) => {
        try {
          const [{ postedWord, semesters }] = await postWordApi(newWord)

          const wordIds = await snapshot.getPromise(wordIdsState)
          set(wordIdsState, [postedWord.id, ...wordIds])
          set(wordsFamily(postedWord.id), postedWord)
          set(semestersState, semesters.semesters)
        } catch {}
      },
    [],
  )

  return handlePostWord
}
