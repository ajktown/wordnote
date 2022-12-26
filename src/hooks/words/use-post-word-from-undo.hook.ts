import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

type UsePostWordFromUndo = () => Promise<void> // handlePostWordFromUndo

export const usePostWordFromUndo = (
  undoingWordId: string,
): UsePostWordFromUndo => {
  const handlePostWordFromUndo = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const word = await snapshot.getPromise(wordsFamily(undoingWordId))
        const rePostingWord: WordData = Object.assign({}, word, {
          isDeleted: false,
        })

        await postWordApi(rePostingWord)
        set(wordsFamily(undoingWordId), rePostingWord)
      },
    [undoingWordId],
  )

  return handlePostWordFromUndo
}
