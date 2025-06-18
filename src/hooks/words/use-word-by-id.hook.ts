import { getWordByIdApi } from '@/api/words/get-word-by-id.api'
import { wordsFamily } from '@/states/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useHandleApiError } from '../use-handle-api-error.hook'

export const useWordById = (id: string) => {
  const onHandleApiError = useHandleApiError()

  const onGetWordById = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [word] = await getWordByIdApi(id)
          set(wordsFamily(word.id), word)
        } catch (err) {
          set(wordsFamily(id), null)
          onHandleApiError(err)
        }
      },
    [id, onHandleApiError],
  )

  return onGetWordById
}
