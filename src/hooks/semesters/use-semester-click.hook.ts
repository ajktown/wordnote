import { useRecoilCallback } from 'recoil'
import { useWords } from '../words/use-words.hook'

type UseSemesterClick = [boolean, (clickedSemester: number) => Promise<void>]
export const useSemesterClick = (): UseSemesterClick => {
  const [loading, getWords] = useWords()

  const onSemesterClick = useRecoilCallback(
    () => async (clickedSemester: number) => {
      await getWords({
        semester: clickedSemester,
        pageIndex: 0, // must reset page index
        daysAgo: undefined, // must reset days ago
        languageCodes: undefined, // must reset language codes
        isFavorite: undefined, // must reset is favorite
        tags: undefined, // must reset tags
      })
    },
    [getWords],
  )

  return [loading, onSemesterClick]
}
