import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from './index.keys'
import { semesterFilteredWordIds, wordsFamily } from './words.state'

enum TagRecoilKey {
  SelectedTags = `SelectedTags`,
  CustomizedTags = `CustomizedTags`,
}

export const selectedTagsState = atom<string[]>({
  key: TagRecoilKey.SelectedTags,
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
