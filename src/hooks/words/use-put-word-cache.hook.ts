import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import {
  WordDataModifiable,
  WordDataModifiableKey,
} from '@/api/words/words.interface'
import { isEmptyObjectHandler } from '@/handlers/is-empty-object.handler'
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UsePutWordCache = [
  () => Promise<void>, // handleApplyCache
  () => Promise<void>, // handleResetCache
  () => Promise<boolean>, // isModified
]
export const usePutWordCache = (
  wordId: string | null,
  wordKey?: WordDataModifiableKey,
): UsePutWordCache => {
  const getObjectWithKey = useRecoilCallback(
    ({ snapshot }) =>
      async (
        wordKey: WordDataModifiableKey,
      ): Promise<Partial<WordDataModifiable>> => {
        const modifiedPart = await snapshot.getPromise(
          modifyingWordFamily(wordKey),
        )

        if (!modifiedPart) return {}
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
    [getObjectWithKey, wordKey],
  )

  const handleResetByKey = useRecoilCallback(
    ({ set }) =>
      async (wordKey: WordDataModifiableKey) => {
        set(modifyingWordFamily(wordKey), null)
      },
    [wordKey],
  )

  const isModified = useCallback(async () => {
    const modified = wordKey
      ? await getObjectWithKey(wordKey)
      : await getObject()
    return !isEmptyObjectHandler(modified)
  }, [wordKey, getObjectWithKey, getObject])

  const handleResetCache = useCallback(async() => {
    if (wordKey) {
      await handleResetByKey(wordKey)
      return
    } 

    await handleResetByKey(`term`)
    await handleResetByKey(`languageCode`)
    await handleResetByKey(`isFavorite`)
    await handleResetByKey(`pronunciation`)
    await handleResetByKey(`definition`)
    await handleResetByKey(`example`)
  }, [wordKey, handleResetByKey])

  const handleApplyCache = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        if (wordId === null) return

        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        const modified = wordKey
          ? await getObjectWithKey(wordKey)
          : await getObject()
        if (isEmptyObjectHandler(modified)) return

        await putWordByIdApi(wordId, modified)

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })

        handleResetCache()
      },
    [wordId, wordKey, handleResetCache],
  )

  return [handleApplyCache, handleResetCache, isModified]
}
