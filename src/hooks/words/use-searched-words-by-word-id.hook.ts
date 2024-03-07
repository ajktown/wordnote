import { useRecoilCallback } from 'recoil'
import { getWordsApi } from '@/api/words/get-words.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { searchedWordsByWordIdState } from '@/recoil/words/searchInput.state'

/**
 * useSearchedWordsByWordId search words based on the information of word id
 * and store it in a recoil state separate from the main word state.
 * this way users can search for words without affecting the main word state.
 */
export const useSearchedWordsByWordId = (wordId: string) => {
  const onGetSearchedWordsByWordId = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          if (!wordId) return // empty wordId

          const word = await snapshot.getPromise(wordsFamily(wordId))
          if (!word) return // no such word found. cannot search

          const [data] = await getWordsApi({ searchInput: word.term })
          set(searchedWordsByWordIdState, data.words)
        } catch {
          set(searchedWordsByWordIdState, null)
        }
      },
    [wordId],
  )

  return onGetSearchedWordsByWordId
}
