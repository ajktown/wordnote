import { useRecoilCallback } from 'recoil'
import { wordsCreatedDaysAgoState } from '@/recoil/words/created-date-tags.state'
import { languageCodesBySemesterState } from '@/recoil/words/languages.state'
import { getSemesterByIdApi } from '@/api/semesters/get-semester-by-id.api'

export const useSemesterById = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async (id: string) => {
        const [semester] = await getSemesterByIdApi(id)
        set(wordsCreatedDaysAgoState, semester.details.daysAgo)
        set(languageCodesBySemesterState, semester.details.languages)
      },
    [],
  )

  return handleRefresh
}
