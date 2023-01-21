import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

type UsePostWord = (newWord: WordData) => Promise<void> // handlePostWord

export const usePostWord = (): UsePostWord => {
  const handlePostWord = useRecoilCallback(
    ({ set, snapshot }) =>
      async (newWord: WordData) => {
        const postedWord = await postWordApi(newWord)

        const wordIds = await snapshot.getPromise(wordIdsState)
        set(wordIdsState, [postedWord.id, ...wordIds])
        set(wordsFamily(postedWord.id), postedWord)
      },
    [],
  )

  return handlePostWord
}
