import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from './index.keys'
import { semesterFilteredWordIds, wordsFamily } from './words.state'

enum TagRecoilKey {
  SelectedCustomizedTags = `SelectedCustomizedTags`,
  CustomizedTags = `CustomizedTags`,
}

export const selectedCustomizedTagsState = atom<string[]>({
  key: TagRecoilKey.SelectedCustomizedTags,
  default: [],
})

export const customizedTagsState = selector<string[]>({
  key: TagRecoilKey.CustomizedTags + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(semesterFilteredWordIds)
    const tags = new Set<string>()

    for (const wordId of wordIds) {
      const word = get(wordsFamily(wordId))
      if (!word) continue
      word.tags.forEach((tag) => tags.add(tag))
    }

    return Array.from(tags)
  },
})
