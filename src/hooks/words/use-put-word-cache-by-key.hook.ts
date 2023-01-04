import {
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/words.interface'
import { modifyingWordFamily, wordsFamily } from '@/recoil/words.state'
import {  useCallback, useMemo } from 'react'
import {  useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { usePutWord } from './use-put-word.hook'

type Value = WordDataModifiableValue | null
type UsePutWordCache = [
  Value, // Shows the current modifying value. If not found, it will simply return non-modified ones.
  (newInput: WordDataModifiableValue | null) => any,
  boolean, // isModified
  () => void,
  () => void,
]

export const usePutWordCacheByKey = (
  wordId: string,
  wordKey: WordDataModifiableKey,
): UsePutWordCache => {
  const word = useRecoilValue(wordsFamily(wordId))
  const putWord = usePutWord(wordId)
  const [modifiedData, setModifiedData] = useRecoilState(modifyingWordFamily(wordKey))
  const handleResetCacheByKey = useResetRecoilState(modifyingWordFamily(wordKey))

  const value: Value = useMemo(() => {
    if (word === null) return null
    if (modifiedData === null) return word[wordKey]
    return modifiedData
  }, [wordKey , word, modifiedData])

  const isModified: boolean = useMemo(() => {
    if (word === null ||
      modifiedData === null ||
      modifiedData === word[wordKey]
    ) return false
    return true
  }, [wordKey , word, modifiedData])

  const handleApplyCache = useCallback(() => {
    putWord({ [wordKey]: modifiedData })
    handleResetCacheByKey()
  }, [putWord, modifiedData, putWord, handleResetCacheByKey])

  return [value, setModifiedData, isModified, handleApplyCache, handleResetCacheByKey]
}
