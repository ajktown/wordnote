import { postWordApi } from '@/api/words/post-word.api'
import { WordData } from '@/api/words/words.interface'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UsePostWord = (newWord: WordData) => Promise<void> // handlePostWord

export const usePostWord = (): UsePostWord => {
  const setWord = useRecoilCallback(
    ({ set, snapshot }) =>
      async (wordData: WordData) => {
        const wordIds = await snapshot.getPromise(wordIdsState)
        set(wordIdsState, [wordData.id, ...wordIds])
        set(wordsFamily(wordData.id), wordData)
      },
    [],
  )

  const handlePostWord = useCallback(async (newWord: WordData) => {
    try {
      const postedWord = await postWordApi(newWord)
      setWord(postedWord)
    } catch {}
  }, [setWord])

  return handlePostWord
}
