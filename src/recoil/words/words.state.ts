import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily, selector } from 'recoil'
import { Rks } from '@/recoil/index.keys'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'

enum PrivateWordRecoilKey {
  Words = `Words`,
  GetWordsParams = `getWordsParams`,
  ModifyingWords = `ModifyingWords`,
  isFavoriteClicked = `isFavoriteClicked`,
  selectedSemester = `SelectedSemester`,
  SelectedDaysAgo = `SelectedDaysAgo`,
  WordIds = `WordIds`,
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

export const wordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.WordIds,
  default: [],
})

export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: PrivateWordRecoilKey.GetWordsParams,
  default: {},
})

export const isFavoriteClickedSelector = selector<boolean>({
  key: PrivateWordRecoilKey.isFavoriteClicked + Rks.Selector,
  get: ({ get }) => {
    return !!get(getWordsParamsState).isFavorite
  },
})

export const selectedSemesterState = selector<undefined | number>({
  key: PrivateWordRecoilKey.selectedSemester + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).semester
  },
})

export const selectedDaysAgoState = selector<undefined | number>({
  key: PrivateWordRecoilKey.SelectedDaysAgo + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).daysAgo
  },
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.TempLikedWordIds,
  default: [],
})
