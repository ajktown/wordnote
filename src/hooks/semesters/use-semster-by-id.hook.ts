import { useRecoilCallback } from 'recoil'
import { wordsCreatedDaysAgoState } from '@/recoil/words/created-date-tags.state'
import { languageCodesBySemesterState } from '@/recoil/words/languages.state'
import { getSemesterByIdApi } from '@/api/semesters/get-semester-by-id.api'
import { semesterDetailFamily } from '@/recoil/words/semesters.state'

export const useSemesterById = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async (id: string | null) => {
        if (id === null) return // TODO: Kind of weird way to write.

        const [semester] = await getSemesterByIdApi(id)
        set(semesterDetailFamily(semester.id), semester.details)

        // TODO: The below code is not required. remove it.
        // Why => Want to save all the details for the semesterDetailFamily
        set(wordsCreatedDaysAgoState, semester.details.daysAgo)
        set(languageCodesBySemesterState, semester.details.languages)
      },
    [],
  )

  return handleRefresh
}
