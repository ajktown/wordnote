import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

type UsePostWordFromUndo = (wordId: string) => Promise<void> // handlePostWordFromUndo

export const usePostWordFromUndo = (): UsePostWordFromUndo => {
  const handlePostWordFromUndo = useRecoilCallback(
    ({ set, snapshot }) =>
      async (wordId: string) => {
        const word = await snapshot.getPromise(wordsFamily(wordId))
        const rePostingWord: WordData = Object.assign({}, word, {
          isDeleted: false,
        })

        await postWordApi(rePostingWord)
        set(wordsFamily(wordId), rePostingWord)
      },
    [],
  )

  return handlePostWordFromUndo
}
