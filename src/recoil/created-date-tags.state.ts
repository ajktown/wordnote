import { atom } from 'recoil'

enum PrivateRecoilKey {
  CreatedDaysBeforePreferredDays = `ShowingCreatedDays`,
  SelectedCreatedDay = `SelectedCreatedDay`,
}

export const createdDaysBeforePreferredDaysState = atom<number[]>({
  key: PrivateRecoilKey.CreatedDaysBeforePreferredDays,
  default: [0, 1, 4, 7, 14, 21, 30, 60],
})

export const selectedCreatedDayState = atom<null | number>({
  key: PrivateRecoilKey.SelectedCreatedDay,
  default: null,
})
