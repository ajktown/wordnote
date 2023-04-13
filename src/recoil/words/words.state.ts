import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily } from 'recoil'
import { Rkp, Rks } from '@/recoil/index.keys'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'

/** Private Recoil Key */
enum Prk {
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
  key: Rkp.Words + Rks.Family,
  default: undefined,
})

export const wordIdsState = atom<string[]>({
  key: Rkp.Words + Prk.WordIds,
  default: [],
})

export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: Rkp.Words + Prk.ModifyingWords + Rks.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: Rkp.Words + Rks.Dialog,
  default: null, // nothing selected
})

export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: Rkp.Words + Prk.GetWordsParams,
  default: {},
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: Rkp.Words + Prk.TempLikedWordIds,
  default: [],
})
