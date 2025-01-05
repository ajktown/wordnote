import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily } from 'recoil'
import { Rkp, Rks } from '@/recoil/index.keys'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import { PaginationRootProps } from '@/api/index.interface'

/** Private Recoil Key */
enum Prk {
  WordIds = `WordIds`,
  WordPagination = `WordPagination`,
  GetWordsParams = `getWordsParams`,
  ModifyingWords = `ModifyingWords`,
  TempLikedWordIds = `TempLikedWordIds`,
  FixedTagsState = `FixedTagsState`,
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

/** Used by both word ids list and words. Word ids take too much DB consumption so it is disabled. */
// TODO: Change to getWordsPaginationState
export const wordIdsPagination = atom<undefined | PaginationRootProps>({
  key: Rkp.Words + Prk.WordPagination,
  default: undefined,
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

// TODO: I think this should be more of the derived state rather than itself.
// And of course when data is required, the params get modified too.
export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: Rkp.Words + Prk.GetWordsParams,
  default: {},
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: Rkp.Words + Prk.TempLikedWordIds,
  default: [],
})

/**
 * fixedTagsState contains a list of tags that should be always included when user create a new word.
 * This way user does not have to add tag for each word they create in a short period of time.
 */

type FixedTagsState =
  | null // default: meaning dialog is closed
  | string[] // dialog is open: Empty array means no fixed tags but still will show the dialog.
export const fixedTagsState = atom<FixedTagsState>({
  key: Rkp.Words + Prk.FixedTagsState,
  default: null,
})
