import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { useWords } from './use-words.hook'
import { useSemesters } from '../semesters/use-semesters.hook'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'

/**
 * Sync words with the API Server. If selectedSemester is undefined,
 * it is considered as the end user has never created a word before.
 * the API will understand and return the latest semester.
 */
export const useWordsWithSemesters = () => {
  const selectedSemester = useRecoilValue(selectedSemesterSelector)

  const [, onGetWords] = useWords()
  const onGetSemesters = useSemesters()

  const onGetWordWithSemesters = useCallback(async () => {
    try {
      const { latestSemesterCode } = await onGetSemesters()

      // If user has selected semester at least once, we should refresh the semester.
      if (selectedSemester) onGetWords({ semester: selectedSemester })
      // If not, it should select the latest semester.
      else onGetWords({ semester: latestSemesterCode }) // User has never created word even once.
    } catch {}
  }, [selectedSemester, onGetSemesters, onGetWords])

  return onGetWordWithSemesters
}
