import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily } from 'recoil'
import { Rks } from '@/recoil/index.keys'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'

/** Private Recoil Key */
enum Prk {
  Words = `Words`,
  WordIds = `WordIds`,
  GetWordsParams = `getWordsParams`,
  ModifyingWords = `ModifyingWords`,
  TempLikedWordIds = `TempLikedWordIds`,
}

type PrivateWordsFamily =
  | undefined // not loaded
  | null // loaded, but not found
  | WordData
export const wordsFamily = atomFamily<PrivateWordsFamily, string>({
  key: Prk.Words + Rks.Family,
  default: undefined,
})

export const wordIdsState = atom<string[]>({
  key: Prk.WordIds,
  default: [],
})

export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: Prk.ModifyingWords + Rks.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: Prk.Words + Rks.Dialog,
  default: null, // nothing selected
})

export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: Prk.GetWordsParams,
  default: {},
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: Prk.TempLikedWordIds,
  default: [],
})
