/**
 * This file contains all the selectors for the preference.state.ts
 */
import { Rkp, Rks } from '@/recoil/index.keys'
import { selector } from 'recoil'
import { preferenceState } from './preference.state'

/** Private Recoil Key */
enum Prk {
  GptKey = `GptKey`,
}

/**
 * If no key registered or has no preference in the first place, it returns ""
 */
export const gptApiKeySelector = selector<string>({
  key: Rkp.Preferences + Prk.GptKey + Rks.Selector,
  get: ({ get }) => {
    return get(preferenceState)?.gptApiKey ?? ''
  },
})
