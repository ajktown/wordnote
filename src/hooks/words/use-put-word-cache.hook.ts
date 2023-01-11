import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import {
  WordDataModifiable,
  WordDataModifiableKey,
} from '@/api/words/words.interface'
import { isEmptyObjectHandler } from '@/handlers/is-empty-object.handler'
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

// TODO: I think you can refactor this entire hook in a cleaner way.
type UsePutWordCache = [
  () => Promise<void>, // handleApplyCache
  () => Promise<void>, // handleResetCache
  () => Promise<boolean>, // isModified
]
export const usePutWordCache = (wordId: string | null): UsePutWordCache => {
  const getObjectWithKey = useRecoilCallback(
    ({ snapshot }) =>
      async (
        wordKey: WordDataModifiableKey,
      ): Promise<Partial<WordDataModifiable>> => {
        const modifiedPart = await snapshot.getPromise(
          modifyingWordFamily(wordKey),
        )

        if (modifiedPart === null) return {}
        return {
          [wordKey]: modifiedPart,
        }
      },
    [],
  )

  const getObject = useRecoilCallback(
    () => async (): Promise<Partial<WordDataModifiable>> => {
      return {
        ...(await getObjectWithKey(`term`)),
        ...(await getObjectWithKey(`languageCode`)),
        ...(await getObjectWithKey(`isFavorite`)),
        ...(await getObjectWithKey(`pronunciation`)),
        ...(await getObjectWithKey(`definition`)),
        ...(await getObjectWithKey(`example`)),
      }
    },
    [getObjectWithKey],
  )

  const handleResetByKey = useRecoilCallback(
    ({ set }) =>
      async (wordKey: WordDataModifiableKey) => {
        set(modifyingWordFamily(wordKey), null)
      },
    [],
  )

  const isModified = useCallback(async () => {
    const modified = await getObject()
    return !isEmptyObjectHandler(modified)
  }, [getObject])

  const handleResetCache = useCallback(async () => {
    // TODO: Lol looks so bad here.
    await handleResetByKey(`term`)
    await handleResetByKey(`languageCode`)
    await handleResetByKey(`isFavorite`)
    await handleResetByKey(`pronunciation`)
    await handleResetByKey(`definition`)
    await handleResetByKey(`example`)
  }, [handleResetByKey])

  const handleApplyCache = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        if (wordId === null) return

        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        const modified = await getObject()
        if (isEmptyObjectHandler(modified)) return

        await putWordByIdApi(wordId, modified)

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })

        handleResetCache()
      },
    [wordId, handleResetCache],
  )

  return [handleApplyCache, handleResetCache, isModified]
}
