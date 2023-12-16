import { getSharedResourceApi } from '@/api/shared-resources/get-shared-resource.api'
import { sharedWordFamily } from '@/recoil/shared-resource/shared-resource.state'
import { useRecoilCallback } from 'recoil'

/**
 *
 * @param wordId requires non-empty string. if others given, then it won't process.
 * @returns nothing
 */
export const useSharedResource = (wordId: any) => {
  const onGetSharedResource = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          if (typeof wordId !== `string` || !wordId) return

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
