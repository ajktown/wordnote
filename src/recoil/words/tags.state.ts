import { atom } from 'recoil'

enum TagRecoilKey {
  SelectedCustomizedTags = `SelectedCustomizedTags`,
  CustomizedTags = `CustomizedTags`,
}

export const selectedCustomizedTagsState = atom<string[]>({
  key: TagRecoilKey.SelectedCustomizedTags,
  default: [],
})
