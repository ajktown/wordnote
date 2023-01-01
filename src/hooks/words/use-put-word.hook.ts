import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import {
  WordDataModifiable,
  WordDataModifiableKey,
} from '@/api/words/words.interface'
import { isEmptyObjectHandler } from '@/handlers/is-empty-object.handler'
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

export const usePutWord = (wordId: string, wordKey?: WordDataModifiableKey) => {
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

  const handleReset = useCallback(() => {
    if (wordKey) return handleResetByKey(wordKey)

    handleResetByKey(`term`)
    handleResetByKey(`languageCode`)
    handleResetByKey(`isFavorite`)
    handleResetByKey(`pronunciation`)
    handleResetByKey(`definition`)
    handleResetByKey(`example`)
  }, [wordKey, handleResetByKey])

  const handleChange = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        const modified = wordKey
          ? await getObjectWithKey(wordKey)
          : await getObject()
        if (isEmptyObjectHandler(modified)) return

        await putWordByIdApi(wordId, modified)
        console.log({ modified })

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })

        handleReset()
      },
    [wordId, wordKey, handleReset],
  )

  return [handleChange, handleReset]
}
