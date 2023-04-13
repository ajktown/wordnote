import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily } from 'recoil'
import { Rks } from '@/recoil/index.keys'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'

enum PrivateWordRecoilKey {
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
  key: PrivateWordRecoilKey.Words + Rks.Family,
  default: undefined,
})

export const wordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.WordIds,
  default: [],
})

export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: PrivateWordRecoilKey.ModifyingWords + Rks.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: PrivateWordRecoilKey.Words + Rks.Dialog,
  default: null, // nothing selected
})

export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: PrivateWordRecoilKey.GetWordsParams,
  default: {},
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.TempLikedWordIds,
  default: [],
})
