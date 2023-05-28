import { getSemestersApi } from '@/api/semesters/get-semesters.api'
import { semestersState } from '@/recoil/words/semesters.state'
// import { getWordsParamsState } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'

export const useSemesters = () => {
  const handleRefresh = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          const [semesters] = await getSemestersApi()
          set(semestersState, semesters.semesters)

          // const lastParams = await snapshot.getPromise(getWordsParamsState)
          // if (lastParams.semester) return

          // lastParams.semester = semesters.latestSemesterCode
          // set(getWordsParamsState, lastParams)
        } catch {
          reset(semestersState)
        }
      },
    [],
  )

  return handleRefresh
}
