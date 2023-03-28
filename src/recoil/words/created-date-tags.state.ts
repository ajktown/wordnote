import { timeHandler } from '@/handlers/time.handler'
import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from '@/recoil/index.keys'
import { semesterFilteredWordIds, wordsFamily } from './words.state'

enum PrivateRecoilKey {
  CreatedDaysBeforePreferredDays = `ShowingCreatedDays`,
  SelectedCreatedDay = `SelectedCreatedDay`,
}

// TODO: This will be used for the user preference and will be exported in the future as non-private variable.
const privateCreatedDaysBeforePreferredDaysState = atom<number[]>({
  key: PrivateRecoilKey.CreatedDaysBeforePreferredDays,
  default: [0, 1, 4, 7, 14, 21, 30, 60],
})

export const simplifiedDaysBeforeState = selector<number[]>({
  key:
    PrivateRecoilKey.CreatedDaysBeforePreferredDays + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(semesterFilteredWordIds)
    const daysAgo = new Set<number>()

    wordIds.forEach((wordId) => {
      const word = get(wordsFamily(wordId))
      if (word != null) daysAgo.add(timeHandler.getDaysAgo(word.createdAt))
    })

    return get(privateCreatedDaysBeforePreferredDaysState).filter(
      (dayBefore) => {
        return daysAgo.has(dayBefore)
      },
    )
  },
})

export const selectedCreatedDayState = atom<null | number>({
  key: PrivateRecoilKey.SelectedCreatedDay,
  default: null,
})
