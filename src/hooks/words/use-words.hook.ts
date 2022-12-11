import { getWordsApi } from '@/api/words/get-words.api'
import { WordData } from '@/api/words/words.interface'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useEffect } from 'react'
import { useRecoilCallback, useSetRecoilState } from 'recoil'
import { HandleRefresh, useHookRefresh } from '../use-refresh.hook'

type UserWords = HandleRefresh

export const useWords = (): UserWords => {
  const [internalFlag, handleRefresh] = useHookRefresh()
  const setWordIds = useSetRecoilState(wordIdsState)
  const setWord = useRecoilCallback(
    ({ set }) =>
      async (wordData: WordData) => {
        set(wordsFamily(wordData.id), wordData)
      },
    [],
  )

  useEffect(() => {
    ;(async () => {
      const words = await getWordsApi()
      words.forEach((word) => setWord(word))
      setWordIds(words.map((word) => word.id))
    })()
  }, [internalFlag, setWord, setWordIds])

  return handleRefresh
}
