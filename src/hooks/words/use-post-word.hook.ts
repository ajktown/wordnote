import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/interfaces'
import { wordIdsState, wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'

type UsePostWord = (newWord: WordData) => Promise<void> // handlePostWord

export const usePostWord = (): UsePostWord => {
  const handlePostWord = useRecoilCallback(
    ({ set, snapshot }) =>
      async (newWord: WordData) => {
        try {
          const [postedWord] = await postWordApi(newWord)

          const wordIds = await snapshot.getPromise(wordIdsState)
          set(wordIdsState, [postedWord.id, ...wordIds])
          set(wordsFamily(postedWord.id), postedWord)
        } catch {}
      },
    [],
  )

  return handlePostWord
}
