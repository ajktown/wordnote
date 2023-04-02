import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from '@/recoil/index.keys'

enum PrivateRecoilKey {
  CreatedDaysBeforePreferredDays = `ShowingCreatedDays`,
  WordsCreatedDaysAgo = `WordsCreatedDaysAgo`,
  SelectedCreatedDay = `SelectedCreatedDay`,
}

// TODO: This will be used for the user preference and will be exported in the future as non-private variable.
const privateCreatedDaysBeforePreferredDaysState = atom<number[]>({
  key: PrivateRecoilKey.CreatedDaysBeforePreferredDays,
  default: [0, 1, 4, 7, 14, 21, 30, 60],
})

export const wordsCreatedDaysAgoState = atom<number[]>({
  key: PrivateRecoilKey.WordsCreatedDaysAgo,
  default: [],
})

export const simplifiedDaysBeforeState = selector<number[]>({
  key:
    PrivateRecoilKey.CreatedDaysBeforePreferredDays + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordsCreatedDaysAgo = get(wordsCreatedDaysAgoState)

    return get(privateCreatedDaysBeforePreferredDaysState).filter(
      (dayBefore) => {
        return wordsCreatedDaysAgo.includes(dayBefore)
      },
    )
  },
})

export const selectedCreatedDayState = atom<null | number>({
  key: PrivateRecoilKey.SelectedCreatedDay,
  default: null,
})
