import { useRecoilCallback } from 'recoil'
import { getWordsApi } from '@/api/words/get-words.api'
import { dialogSearchedWordsState } from '@/states/words/searchInput.state'

/**
 * useDialogSearchedWords search words based on the provided WordData's term
 * and store it in a recoil state separate from the main word state.
 * this way users can search for words without affecting the main word state.
 */
export const useDialogSearchedWords = (term: string | null) => {
  const onGetDialogSearchedWords = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          if (term === null) {
            set(dialogSearchedWordsState, null)
            return // no term
          }

          if (!term) {
            set(dialogSearchedWordsState, [])
            return // empty term
          }

          const [data] = await getWordsApi({ searchInput: term })
          set(dialogSearchedWordsState, data.words)
        } catch {
          set(dialogSearchedWordsState, null)
        }
      },
    [term],
  )

  return onGetDialogSearchedWords
}
