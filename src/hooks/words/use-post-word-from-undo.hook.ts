import { postWordApi } from '@/api/words/post-word.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { wordIdsState } from '@/recoil/words/words.state'

type UsePostWordFromUndo = () => Promise<void> // handlePostWordFromUndo

export const usePostWordFromUndo = (
  undoingWordId: string,
): UsePostWordFromUndo => {
  const handlePostWordFromUndo = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const word = await snapshot.getPromise(wordsFamily(undoingWordId))
        if (!word) return // failed to re-post word

        const [recreatedWord] = await postWordApi(word)
        const wordIds = (await snapshot.getPromise(wordIdsState)).map((id) => {
          if (id === undoingWordId) return recreatedWord.id
          return id
        })

        set(wordIdsState, wordIds)
        set(wordsFamily(recreatedWord.id), recreatedWord)
      },
    [undoingWordId],
  )

  return handlePostWordFromUndo
}
