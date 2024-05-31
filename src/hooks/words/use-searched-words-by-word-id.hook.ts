import { useRecoilCallback } from 'recoil'
import { getWordsApi } from '@/api/words/get-words.api'
import { termDialogSearchedResultState } from '@/recoil/words/searchInput.state'

/**
 * useSearchedWordsByWordId search words based on the information of word id
 * and store it in a recoil state separate from the main word state.
 * this way users can search for words without affecting the main word state.
 */
export const useSearchDialogByTerm = (term: string | null) => {
  const onGetSearchedWordsByWordId = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          if (term === null) {
            set(termDialogSearchedResultState, null)
            return // no term
          }

          if (!term) {
            set(termDialogSearchedResultState, [])
            return // empty term
          }

          const [data] = await getWordsApi({ searchInput: term })
          set(termDialogSearchedResultState, data.words)
        } catch {
          set(termDialogSearchedResultState, null)
        }
      },
    [term],
  )

  return onGetSearchedWordsByWordId
}
