import { getSharedResourceApi } from '@/api/shared-resources/get-shared-resource.api'
import {
  sharedWordFamily,
  sharedWordIdState,
} from '@/recoil/shared-resource/shared-resource.state'
import { useRecoilCallback } from 'recoil'

export const useSharedResource = (wordId: string) => {
  const onGetSharedResource = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(sharedWordIdState, wordId)
        try {
          const [data] = await getSharedResourceApi({
            id: undefined,
            wordId,
          })
          set(sharedWordFamily(wordId), data.word)
        } catch {
          set(sharedWordFamily(wordId), null)
        }
      },
    [wordId],
  )

  return onGetSharedResource
}
